{-# LANGUAGE OverloadedStrings          #-}


module Handler.Login where


import           ClassyPrelude.Yesod
import           Import
import           Utils                   (randomGen)
import           Model
--import           Yesod
import           Data.Text               (Text, pack)
import           Network.HTTP.Types      (status200,status201,status400,status403,status404)


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