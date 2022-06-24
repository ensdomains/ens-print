import React from 'react';
import { Avatar, Typography, lightTheme } from '@ensdomains/thorin';
import styled, { css } from 'styled-components';

const Container = styled.div(
  ({ theme }) => css`
    margin: ${theme.space['4']};
    display: flex;
    justify-content: center;
  `
);

const ContainerInner = styled.div(
  ({ theme, $banner }) => css`
    aspect-ratio: 3/2;
    width: 100%;
    max-width: 600px;
    height: auto;
    padding: clamp(0.2rem, 6vw, 2rem);
    padding-top: clamp(0.2rem, 12vw, 4rem);
    background-image: ${$banner
      ? `url(${$banner})`
      : theme.colors.gradients.blue};
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: 100% 50%;
    background-color: ${theme.colors.background};
    border-radius: ${theme.radii['2xLarge']};
    border: ${theme.space.px} solid ${theme.colors.borderTertiary};
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: ${theme.space['3']};
    flex-gap: ${theme.space['3']};
    transition: 0.5s border-radius;
  `
);

const AvatarWrapper = styled.div(
  () => css`
    width: 30%;
  `
);

const DetailStack = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    flex-gap: ${theme.space['2']};
    gap: ${theme.space['2']};
    align-items: center;
  `
);

const Name = styled(Typography)(
  () => css`
    font-size: clamp(0.5rem, 6vw, 2.4rem);
  `
);

const TextStack = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: ${theme.space['1']};
    flex-gap: ${theme.space['1']};
  `
);

const FirstItems = styled.div(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  `
);

let avatarURL = 'https://metadata.ens.domains/mainnet/avatar/NAME';

const ENSCard = ({ profile }) => {
  const { name, records } = profile;
  return (
    <Container theme={lightTheme}>
      {/* avoid adding margin to the inner container, due to html image conversion */}
      <ContainerInner id="ensCard" $banner={records?.banner}>
        <FirstItems>
          <AvatarWrapper>
            {name && (
              <Avatar label={name} src={avatarURL.replace('NAME', name)} />
            )}
          </AvatarWrapper>
        </FirstItems>
        <TextStack>
          <DetailStack>
            <Name weight="bold">{name}</Name>
            {records?.name && (
              <div
                style={{
                  marginTop: '4px',
                  fontSize: 'clamp(0.2rem, 3vw, 1.2rem)',
                }}
              >
                <Typography weight="bold" color="textTertiary">
                  {records.name}
                </Typography>
              </div>
            )}
          </DetailStack>
          {records?.description && (
            <Typography
              style={{
                fontSize: 'clamp(0.2rem, 3vw, 1.2rem)',
              }}
            >
              {records.description}
            </Typography>
          )}
          {records?.url && (
            <div
              style={{
                width: 'min-content',
                fontSize: 'clamp(0.2rem, 3vw, 1.2rem)',
              }}
            >
              <a href={records.url}>
                <Typography color="blue">
                  {records.url
                    ?.replace(/http(s?):\/\//g, '')
                    .replace(/\/$/g, '')}
                </Typography>
              </a>
            </div>
          )}
        </TextStack>
      </ContainerInner>
    </Container>
  );
};

export default ENSCard;
