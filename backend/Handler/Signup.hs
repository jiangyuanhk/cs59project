{-# LANGUAGE OverloadedStrings          #-}


module Handler.Signup where


import ClassyPrelude.Yesod
import Import
import Utils         (randomGen)
import Model


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
                    return $ object ["email" .= userinfoEmail userinfoItem, "password" .= userinfoPassword userinfoItem, "userid" .= userinfoToken userinfoItem, "token" .= newtoken]