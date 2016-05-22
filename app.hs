{-# LANGUAGE FlexibleContexts           #-}
{-# LANGUAGE GADTs                      #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}
{-# LANGUAGE MultiParamTypeClasses      #-}
{-# LANGUAGE OverloadedStrings          #-}
{-# LANGUAGE QuasiQuotes                #-}
{-# LANGUAGE TemplateHaskell            #-}
{-# LANGUAGE TypeFamilies               #-}
import           Control.Monad.Logger    (runNoLoggingT)
import           Data.Text               (Text)
import           Data.Time
import           Database.Persist.Sqlite
import           Yesod

share [mkPersist sqlSettings, mkMigrate "migrateAll"] [persistLowerCase|
Tweet
    content Text
    username Text
    added UTCTime
|]

data App = App ConnectionPool

mkYesod "App" [parseRoutes|
/         HomeR    GET
/add-tweet AddTweetR POST
|]

instance Yesod App

instance RenderMessage App FormMessage where
    renderMessage _ _ = defaultFormMessage

instance YesodPersist App where
    type YesodPersistBackend App = SqlBackend
    runDB db = do
        App pool <- getYesod
        runSqlPool db pool

getHomeR :: Handler Html
getHomeR = defaultLayout
    [whamlet|
        <h2>Latest feeds
            ^{latestFeeds}
        <form method=post action=@{AddTweetR}>
            <p>
                User
                <input type=text name=username>
                Text
                <input type=text name=content>
                <input type=submit value="Send Message">
    |]

latestFeeds :: Widget
latestFeeds = do
    tweets <- handlerToWidget $ runDB $ selectList [] [LimitTo 5, Desc TweetAdded]
    [whamlet|
        <ul>
            $forall Entity _ tweet <- tweets
                <li>
                    #{tweetUsername tweet} : #{tweetContent tweet}
    |]

postAddTweetR :: Handler ()
postAddTweetR = do
    username <- runInputPost $ ireq textField "username"
    content <- runInputPost $ ireq textField "content"
    now <- liftIO getCurrentTime
    runDB $ insert $ Tweet content username now
    setMessage "content posted"
    redirect HomeR

main :: IO ()
main = runNoLoggingT $ withSqlitePool "feeds.db3" 10 $ \pool -> liftIO $ do
    runSqlPersistMPool (runMigration migrateAll) pool
    warp 3000 $ App pool