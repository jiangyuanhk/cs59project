--https://pbrisbin.com/posts/writing_json_apis_with_yesod/
{-# LANGUAGE FlexibleContexts           #-}
{-# LANGUAGE FlexibleInstances          #-} --Illegal instance declaration for ‘ToJSON (Entity Post)’
{-# LANGUAGE GADTs                      #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}
{-# LANGUAGE MultiParamTypeClasses      #-}
{-# LANGUAGE OverloadedStrings          #-}
{-# LANGUAGE QuasiQuotes                #-}
{-# LANGUAGE TemplateHaskell            #-}
{-# LANGUAGE TypeFamilies               #-}
{-# LANGUAGE ViewPatterns               #-}
import           Control.Applicative        
import           Control.Monad
import           Control.Monad.Logger    (runNoLoggingT)
import           Data.Text               (Text, pack)
import           Data.Time
import           Data.Ratio              (numerator)
import           Database.Persist.Sqlite
import           System.Random
import           Yesod
import           Network.HTTP.Types      (status200,status201,status400,status403,status404)


share [mkPersist sqlSettings, mkMigrate "migrateAll"] [persistLowerCase|
Userinfo
  email Text
  password Text
  userid Text
  token Text
|]

instance ToJSON (Entity Userinfo) where
    toJSON (Entity pid p) = object
        [ "id"       .= (String $ toPathPiece pid)
        , "email"    .= userinfoEmail p
        , "password" .= userinfoPassword p
        , "userid"   .= userinfoUserid p
        , "token"    .= userinfoToken p
        ]

instance FromJSON Userinfo where
    parseJSON (Object o) = Userinfo
        <$> o .: "email"
        <*> o .: "password"
        <*> o .: "userid"
        <*> o .: "token"

    parseJSON _ = mzero

data App = App ConnectionPool

mkYesod "App" [parseRoutes|
/api/v1/signup          SignupR GET POST
/api/v1/login           LoginR      POST
|]

getSignupR :: Handler Value
getSignupR = do
    userinfos <- runDB $ selectList [] [] :: Handler [Entity Userinfo]

    return $ object ["userinfos" .= userinfos]

postSignupR :: Handler Value
postSignupR = do
    userinfoItem <- requireJsonBody :: Handler Userinfo
    userInfoEntry <- runDB $ selectFirst [UserinfoEmail ==. userinfoEmail userinfoItem ] [LimitTo 1]
    case userInfoEntry of
        Just u  -> sendResponseStatus status403 ("Email Address Exist" :: Text)
        Nothing -> do
            userInfoEntry2 <- runDB $ selectFirst [UserinfoUserid ==. userinfoUserid userinfoItem ] [LimitTo 1]
            case userInfoEntry2 of
                Just u  -> sendResponseStatus status403 ("User Name Exist" :: Text)
                Nothing -> do 
                    entryId    <- runDB $ insert $ userinfoItem 
                    newtoken   <- liftIO randomGen
                    _          <- runDB $ update entryId [UserinfoToken =. newtoken]
                    return $ object ["token" .= newtoken]

getTime :: IO Integer
getTime = do
  utc <- getCurrentTime
  let daytime = toRational $ utctDayTime utc
  return $ numerator daytime

randomGen :: IO Text
randomGen = do 
    timestamp <- fromIntegral <$> getTime
    return $ pack $ take 10 . randomRs ('a', 'z') . mkStdGen $ timestamp

postLoginR :: Handler Value
postLoginR = do
    userinfoItem <- requireJsonBody :: Handler Userinfo
    userInfoEntry <- runDB $ selectFirst [UserinfoEmail ==. userinfoEmail userinfoItem, UserinfoPassword ==. userinfoPassword userinfoItem] []
    case userInfoEntry of
        Nothing -> sendResponseStatus status403 ("Invalid Email or Password"::Text)
        Just (Entity pid p)  -> do
            newtoken   <- liftIO randomGen
            _          <- runDB $ update pid [UserinfoToken =. newtoken]
            return $ object ["userid" .= userinfoUserid p, "token" .= newtoken]
instance Yesod App

instance RenderMessage App FormMessage where
    renderMessage _ _ = defaultFormMessage

instance YesodPersist App where
    type YesodPersistBackend App = SqlBackend
    runDB db = do
        App pool <- getYesod
        runSqlPool db pool

main :: IO ()
main = runNoLoggingT $ withSqlitePool "links.db3" 10 $ \pool -> liftIO $ do
    runSqlPersistMPool (runMigration migrateAll) pool
    warp 3000 $ App pool

