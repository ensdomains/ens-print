import React, { useEffect, useState } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { Button, ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin';
import { toBlob } from 'html-to-image';
import { saveAs } from 'file-saver';
import { isElementReady } from './utils/isElementReady';
import ENSCard from './Card';
import SearchProfile from './Search';

const ButtonStack = styled.div(
  ({ theme }) => css`
    margin: ${theme.space['4']};
  `
);

const sharpenCardEdges = () => {
  const ensCard = document.getElementById('ensCard');
  if (!ensCard) return;
  ensCard.style.borderRadius = 0;
};

const roundCardEdges = () => {
  const ensCard = document.getElementById('ensCard');
  if (!ensCard) return;
  ensCard.style.borderRadius = '16px';
};

const App = () => {
  const [profile, setProfile] = useState();
  const [ render, setRender ] = useState();
  useEffect(() => {
    isElementReady('#ensCard').then((ensCard) => {
      toBlob(ensCard, { style: { borderRadius: '0 !important' } }).then(
        function (blob) {
          setRender(URL.createObjectURL(blob));
        }
      );
    });
  }, [profile]);
  const shareCard = () => {
    const ensCard = document.getElementById('ensCard');
    toBlob(ensCard, { style: { borderRadius: '0 !important' } })
      .then(function (blob) {
        try {
          navigator
            .share({
              title: ENSName,
              text: '',
              files: [
                new File([blob], 'ens.png', {
                  type: blob.type,
                }),
              ],
            })
            .then(() => alert('Share was successful.'))
            .catch((error) => alert('Sharing failed' + error));
        } catch {
          console.log(`Your system doesn't support sharing files.`);
          saveAs(blob);
        }
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  };
  return (
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <SearchProfile setProfile={setProfile} setRender={setRender} />
      {(!render && profile) ? <ENSCard profile={profile} /> : ''}
      { (render && profile) && <img src={render} width="580mm"/> }
      <ButtonStack>
        <Button
          onClick={shareCard}
          onMouseOver={sharpenCardEdges}
          onMouseLeave={roundCardEdges}
          style={{ visibility: profile ? 'visible' : 'hidden' }}
        >
          Print
        </Button>
      </ButtonStack>
    </ThemeProvider>
  );
};

export default App;
