import React, { useRef, useState } from 'react';
import { Button, Input, lightTheme } from '@ensdomains/thorin';
import styled, { css } from 'styled-components';
import { retrieveProfile } from './utils/retrieveProfile';

const ButtonStack = styled.div(
  () => css`
    position: relative;
    width: 100%;
  `
);

const Container = styled.div(
  ({ theme }) => css`
    margin: ${theme.space['4']};
    padding: ${theme.space['6']};
    border-radius: ${theme.radii['2xLarge']};
    border: ${theme.space.px} solid ${theme.colors.borderTertiary};
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: ${theme.space['3']};
    flex-gap: ${theme.space['3']};
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

const SearchProfile = ({ setProfile, setRender }) => {
  const [isLoading, setLoading] = useState(false);
  const inputENSRef = useRef();

  const searchENS = async (event) => {
    event.preventDefault();
    const _name = inputENSRef.current.value;
    if (!_name) return;
    setProfile(null);
    setRender(null);
    setLoading(true);
    const profile = await retrieveProfile(_name);
    console.log('profile', profile);
    setProfile(profile);
    setLoading(false);
    event.target.reset();
  };

  return (
    <form onSubmit={searchENS}>
      <Container theme={lightTheme}>
        <Input
          ref={inputENSRef}
          label="ENS Name"
          placeholder="nick.eth"
          autoComplete="off"
          required
        />
        <TextStack></TextStack>
        <ButtonStack>
          <Button type="submit" loading={isLoading}>
            Search{isLoading ? 'ing...' : ''}
          </Button>
        </ButtonStack>
      </Container>
    </form>
  );
};

export default SearchProfile;
