module Utils where


import           Data.Text               (Text, pack)
import           Data.Time
import           Data.Ratio              (numerator)
import           System.Random


getTime :: IO Integer
getTime = do
  utc <- getCurrentTime
  let daytime = toRational $ utctDayTime utc
  return $ numerator daytime

randomGen :: IO Text
randomGen = do 
    timestamp <- fromIntegral <$> getTime
    return $ pack $ take 10 . randomRs ('a', 'z') . mkStdGen $ timestamp