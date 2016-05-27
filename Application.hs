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


module Application where


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
import           Model
import           Import
import           Handler.Login
import           Handler.Signup


-- second half of defining all the routes
-- first half is in Foundation.hs
mkYesodDispatch "App" resourcesApp


appMain :: IO()
appMain = runNoLoggingT $ withSqlitePool "links.db3" 10 $ \pool -> liftIO $ do
    runSqlPersistMPool (runMigration migrateAll) pool
    warp 3000 $ App pool
