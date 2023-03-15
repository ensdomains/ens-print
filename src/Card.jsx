import { Avatar, Typography } from '@ensdomains/thorin';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import cardTemplate from './card.svg';
import dubai from './dubai.png';

const Container = styled.div(
  (props) => css`
    width: 159mm;
    height: 238mm;
    padding: 4.8mm 0 7.2mm;
    background-image: url(${(props) => props.imgUrl});
    display: flex;
    flex-direction: column;
    z-index: 1;
  `
);

const AvatarWrapper = styled.div(
  () => css`
    margin-top: 40px;
    z-index: -1;
  `
);

const Name = styled(Typography)(
  () => css`
    font-weight: bold;
    color: hsl(347, 6%, 13%);
    line-height: 30mm;
    span {
      opacity: 0.6;
    }
  `
);

const MiddleElement = styled.div(
  () => css`
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 6mm;
    flex-grow: 1;
  `
);

const BottomElement = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20mm;
    flex-direction: column;
    margin-bottom: 6mm;
  `
);

const DateLabel = styled(Typography)(
  () => css`
    font-size: 20pt;
    font-weight: bold;
    opacity: 0.6;
    color: hsl(347, 6%, 13%);
  `
);

const DateValue = styled(Typography)(
  () => css`
    font-size: 30pt;
    font-weight: bold;
    color: hsl(347, 6%, 13%);
    line-height: 28pt;
  `
);

let baseAvatarURL = 'https://metadata.ens.domains/mainnet/avatar';

const ENSCard = ({ profile }) => {
  const { name, date } = profile;

  const fontSize = useMemo(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const minFontSize = 16;
    const maxFontSize = 46;
    const maxWidth = 320;

    let fontSize = maxFontSize;

    ctx.font = `${fontSize}pt Satoshi`;
    let width = ctx.measureText(name).width;

    if (width > maxWidth) {
      let decrement = 1;
      while (width > maxWidth) {
        console.log(width);
        fontSize -= decrement;
        if (fontSize < minFontSize) {
          fontSize = minFontSize;
          break;
        }
        ctx.font = `${fontSize}pt Satoshi`;
        width = ctx.measureText(name).width;
        if (width < maxWidth) {
          if (decrement === 1) {
            decrement = 0.1;
            fontSize += 1;
            continue;
          }
          break;
        }
      }
    }
    return fontSize;
  }, [name]);

  return (
    <Container imgUrl={cardTemplate}>
      <MiddleElement>
        <AvatarWrapper>
          {name && (
            <img
              id="ensCardAvatar"
              alt={name}
              src={`${baseAvatarURL}/${name}`}
              onError={(e) => {
                e.currentTarget.src = dubai
              }}
              width="550"
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
  );
};

export default ENSCard;
