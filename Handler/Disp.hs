{-# LANGUAGE OverloadedStrings          #-}


module Handler.Disp where


import ClassyPrelude.Yesod
import Import
import Utils         (randomGen)
import Model

getDispR :: Handler Value
getDispR = do
    tweets <- runDB $ selectList [] [Desc TweetinfoAdded] :: Handler [Entity Tweetinfo]

    return $ object ["tweets" .= tweets]