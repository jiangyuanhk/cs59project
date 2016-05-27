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


module Model where

import           ClassyPrelude.Yesod
import           Database.Persist.Quasi
import           Database.Persist.Sqlite


share [mkPersist sqlSettings, mkMigrate "migrateAll"]
    $(persistFileWith lowerCaseSettings "config/models")

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