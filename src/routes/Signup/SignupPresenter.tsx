import styled from 'styled-components';

const Select = styled.select`
    width: 50px;
    border: 1px solid #999;
    font-family: inherit;
`;

const Option = styled.option`
    width: 50px;
    border: 1px solid #999;
    font-family: inherit;
`;

function SignupPresenter({
    name,
    setName,
    nameChange,
    id,
    pw,
    pw2,
    setId,
    setPw,
    setPw2,
    idChange,
    pwChange,
    pw2Change,
    myTeam,
    setMyTeam,
    teamChange,
    goStart
}:{
    name:string,
    setName:React.Dispatch<React.SetStateAction<string>>,
    nameChange:(e: any) => void, id:string, pw:string,
    pw2:string,
    setId:React.Dispatch<React.SetStateAction<string>>,
    setPw:React.Dispatch<React.SetStateAction<string>>,
    setPw2:React.Dispatch<React.SetStateAction<string>>,
    goStart:() => void,
    idChange:(e: any) => void,
    pwChange:(e: any) => void,
    pw2Change:(e: any) => void,
    myTeam:string,
    setMyTeam:React.Dispatch<React.SetStateAction<string>>,
    teamChange:(e: any) => void
}) {
    return (
        <>
        Signup
        <br />
        name
        <input type="text" onChange={nameChange}/>
        <br />
        id
        <input type="text" onChange={idChange}/>
        <br />
        pw
        <input type="password" onChange={pwChange}/>
        <br />
        pw check
        <input type="password" onChange={pw2Change}/><br />
        my team<Select name="team" onChange={teamChange}>
            <Option value="0">선택</Option>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
            <Option value="11">11</Option>
            <Option value="12">12</Option>
            <Option value="13">13</Option>
            <Option value="14">14</Option>
            <Option value="15">15</Option>
            <Option value="16">16</Option>
            <Option value="17">17</Option>
            <Option value="18">18</Option>
            <Option value="19">19</Option>
            <Option value="20">20</Option>
        </Select>
        <br />
        <button onClick={goStart}>signup</button>
        </>
    );
}

export default SignupPresenter;