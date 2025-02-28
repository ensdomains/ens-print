import { Avatar, Typography } from '@ensdomains/thorin';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import cardTemplate from './card.svg';
import tokyo from './blue-bg.png';

const CardWrapper = styled.div`
  padding: 4mm;
  display: inline-block;
`;

const Container = styled.div(
  (props) => css`
    width: 101.6mm;
    height: 152.4mm;
    padding: 3mm 0 4mm;
    background-image: url(${(props) => props.imgUrl});
    background-size: cover;
    display: flex;
    flex-direction: column;
    z-index: 1;
  `
);

const AvatarWrapper = styled.div(
  () => css`
    margin-top: 14px;
    z-index: -1;
    display: flex;
    justify-content: center;
    img {
      width: 90mm;
      height: auto;
    }
  `
);

const Name = styled(Typography)(
  () => css`
    font-weight: bold;
    color: hsl(347, 6%, 13%);
    line-height: 20mm;
    text-align: center;
    span {
      opacity: 0.6;
    }
  `
);

const MiddleElement = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4mm;
    flex-grow: 1;
  `
);

const BottomElement = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10mm 4mm;
    flex-direction: column;
    margin-bottom: 4mm;
  `
);

const DateLabel = styled(Typography)(
  () => css`
    font-size: 14pt;
    font-weight: bold;
    opacity: 0.6;
    color: hsl(347, 6%, 13%);
  `
);

const DateValue = styled(Typography)(
  () => css`
    font-size: 20pt;
    font-weight: bold;
    color: hsl(347, 6%, 13%);
    line-height: 20pt;
  `
);

let baseAvatarURL = 'https://metadata.ens.domains/mainnet/avatar';

const ENSCard = ({ profile }) => {
  const { name, date } = profile;
  
  const fontSize = useMemo(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const minFontSize = 12;
    const maxFontSize = 28;
    const maxWidth = 200; // Scaled max width for 2x quality
    
    let fontSize = maxFontSize;
    ctx.font = `${fontSize}pt Satoshi`;
    let width = ctx.measureText(name).width;
    
    if (width > maxWidth) {
      let decrement = 0.5;
      while (width > maxWidth) {
        fontSize -= decrement;
        if (fontSize < minFontSize) {
          fontSize = minFontSize;
          break;
        }
        ctx.font = `${fontSize}pt Satoshi`;
        width = ctx.measureText(name).width;
        
        if (width < maxWidth) {
          if (decrement === 0.5) {
            decrement = 0.1;
            fontSize += 0.5;
            continue;
          }
          break;
        }
      }
    }
    
    return fontSize;
  }, [name]);

  return (
    <CardWrapper>
      <Container imgUrl={cardTemplate}>
        <MiddleElement>
          <AvatarWrapper>
            {name && (
              <img
                id="ensCardAvatar"
                alt={name}
                src={`${baseAvatarURL}/${name}`}
                onError={(e) => {
                  e.currentTarget.src = tokyo
                }}
              />
            )}
          </AvatarWrapper>
        </MiddleElement>
        <BottomElement>
          <Name style={{ fontSize: `${fontSize}pt` }}>
            {name.substring(0, name.lastIndexOf('.'))}
            <span>.{name.split('.').slice(-1)}</span>
          </Name>
          <DateLabel>{date.label}</DateLabel>
          <DateValue>{date.value.toLocaleDateString('en-GB')}</DateValue>
        </BottomElement>
      </Container>
    </CardWrapper>
  );
};

export default ENSCard;