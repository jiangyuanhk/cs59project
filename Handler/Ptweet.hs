{-# LANGUAGE OverloadedStrings          #-}


module Handler.Ptweet where


import ClassyPrelude.Yesod
import Import
import Utils         (randomGen)
import Model

postPtweetR :: Handler()
postPtweetR = do
    tweetinfoItem <- requireJsonBody :: Handler Tweetinfo
    userInfoEntry <- runDB $ selectFirst [UserinfoUserid ==. tweetinfoUserid tweetinfoItem, UserinfoToken ==. tweetinfoToken tweetinfoItem] []  
    case userInfoEntry of
        Nothing  -> sendResponseStatus status403 ("Token doesn't match" :: Text)
        Just u   -> do
            entryId     <- runDB $ insert $ tweetinfoItem
            currTime    <- liftIO getCurrentTime
            _           <- runDB $ update entryId [TweetinfoAdded =. currTime]
            sendResponseStatus status200 ("Tweet posted" :: Text)