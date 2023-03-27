import styled from 'styled-components'

const Resource = () => {
  
  const Wrapper = styled.div`
    border-bottom: solid 1px #ccc;
    font-size: small;
  `

  const Box = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 10px;
  `

  const AvatarWrapper = styled.div`
    display: inline;
  `
  const Avatar = styled.div`
    width: 45px;
    height: 45px;
    flex: 0 0 auto;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
  `

  const Initials = styled.span`
    font-size: 18px;
    line-height: 45px;
    background: lightgrey;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 100%;
  `

  const Description = styled.div`
    margin-left: 8px; 
  `

  return (
    <Wrapper>
      <Box>
        <AvatarWrapper>
          <Avatar>
            <Initials>LR</Initials>
          </Avatar>
        </AvatarWrapper>
        <Description>Lukasz Roth</Description>
      </Box>
    </Wrapper>
  )
}

export default Resource
