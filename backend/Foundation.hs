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


module Foundation where


import           Database.Persist.Sqlite
import           Yesod


data App = App ConnectionPool

---- first half of defining all of the routes in our application
---- second half is in Application.hs
mkYesodData "App" $(parseRoutesFile "config/routes")

instance Yesod App

-- for using forms 
instance RenderMessage App FormMessage where
    renderMessage _ _ = defaultFormMessage

-- for database actions
instance YesodPersist App where
    type YesodPersistBackend App = SqlBackend
    runDB db = do
        App pool <- getYesod
        runSqlPool db pool
