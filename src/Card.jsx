import { Avatar, Typography } from '@ensdomains/thorin';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import logo from './logo.svg';

const Container = styled.div(
  () => css`
    width: 145mm;
    height: 105mm;
    padding: 4.8mm 0 7.2mm;
    background-color: white;
    display: flex;
    flex-direction: column;
  `
);

const AvatarWrapper = styled.div(
  () => css`
    width: 32mm;
  `
);

const TopElement = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 6mm;
    width: 100%;
    height: 25.2mm;
    background-color: hsl(197, 100%, 50%);
    div {
      font-size: 32pt !important;
      font-weight: bold !important;
      color: white;
      margin-top: -2mm;
    }
    img {
      height: 14mm;
    }
  `
);

const Name = styled(Typography)(
  () => css`
    font-weight: bold;
    color: hsl(347, 6%, 13%);
    span {
      opacity: 0.6;
    }
  `
);

const MiddleElement = styled.div(
  () => css`
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
    align-items: flex-start;
    justify-content: center;
    padding: 0 6mm;
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
    <Container>
      <TopElement>
        <Typography>My name is</Typography>
        <img src={logo} />
      </TopElement>
      <MiddleElement>
        <Name style={{ fontSize: `${fontSize}pt` }}>
          {name.split('.').slice(0, -1)}
          <span>.{name.split('.').slice(-1)}</span>
        </Name>
        <AvatarWrapper>
          {name && (
            <Avatar
              id="ensCardAvatar"
              label={name}
              src={`${baseAvatarURL}/${name}`}
            />
          )}
        </AvatarWrapper>
      </MiddleElement>
      <BottomElement>
        <DateLabel>{date.label}</DateLabel>
        <DateValue>{date.value.toLocaleDateString('en-GB')}</DateValue>
      </BottomElement>
    </Container>
  );
};

export default ENSCard;
