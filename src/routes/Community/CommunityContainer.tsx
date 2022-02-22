import CommunityPresenter from './CommunityPresenter';
import { useNavigate } from 'react-router';
import { useState } from 'react';
 
function CommunityConatiner () {
    const navigate = useNavigate();
    const [show ,setShow] = useState<Number>(1);

    function set1(){
        setShow(1);
        console.log(show);
    }

    function set2(){
        setShow(2);
        console.log(show);
    }

    function set3(){
        setShow(3);
        console.log(show);
    }

    function goPosting() { 
       navigate(`/posting/${window.localStorage.ID}`);
    }

    return (
        <CommunityPresenter
        show={show}
        setShow={setShow}
        set1 = {set1}
        set2 = {set2}
        set3 = {set3}
        goPosting={goPosting} />
    )
}

export default CommunityConatiner;