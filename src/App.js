import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards';

import useStyles from './styles'

const alankey = 'b17ebb40f7ef05942d0c380d20a6ab2b2e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
  const [newsArticles, setNewArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(-1)
  const classes = useStyles()
  
  useEffect( () => {
    alanBtn({
      key: alankey,
      onCommand: ({ command, articles, number }) => {
        if(command === 'newHeadlines') {
          setNewArticles(articles)
          setActiveArticle(-1)
        }
        else if(command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
        }
        else if(command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number
          const article = articles[parsedNumber-1]

          if(parsedNumber > 20) {
            alanBtn().playText('Please try that again.')
          }
          else if(article) {
            window.open(article.url, '_blank')
            alanBtn().playText('Opening... ')
          }

        }
      }
    })
  }, [])

  return (
    <div className="App">
      <div className={classes.logoContainer}>
        <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
