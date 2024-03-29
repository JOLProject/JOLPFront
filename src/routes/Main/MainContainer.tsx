import { useEffect, useState } from "react";
import MainPresenter from "./MainPresenter";
import { useNavigate, useParams } from "react-router";
// @ts-ignore
import { getCookie, removeCookie, setCookie } from "Cookie.ts";
import axios from "axios";

const today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();
let nowDay = yyyy + "-" + mm + "-" + dd;

console.log(
    "\n\
__________████████_____██████\n\
_________█░░░░░░░░██_██░░░░░░█\n\
________█░░░░░░░░░░░█░░░░░░░░░█\n\
_______█░░░░░░░███░░░█░░░░░░░░░█\n\
_______█░░░░███░░░███░█░░░████░█\n\
______█░░░██░░░░░░░░███░██░░░░██\n\
_____█░░░░░░░░░░░░░░░░░█░░░░░░░░███\n\
____█░░░░░░░░░░░░░██████░░░░░████░░█\n\
____█░░░░░░░░░█████░░░████░░██░░██░░█\n\
___██░░░░░░░███░░░░░░░░░░█░░░░░░░░███\n\
__█░░░░░░░░░░░░░░█████████░░█████████\n\
_█░░░░░░░░░░█████_████___████_█████___█\n\
_█░░░░░░░░░░█______█_███__█_____███_█___█\n\
█░░░░░░░░░░░░█___████_████____██_██████\n\
░░░░░░░░░░░░░█████████░░░████████░░░█\n\
░░░░░░░░░░░░░░░░█░░░░░█░░░░░░░░░░░░█\n\
░░░░░░░░░░░░░░░░░░░░██░░░░█░░░░░░██\n\
░░░░░░░░░░░░░░░░░░██░░░░░░░███████\n\
░░░░░░░░░░░░░░░░██░░░░░░░░░░█░░░░░█\n\
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█\n\
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█\n\
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█\n\
░░░░░░░░░░░█████████░░░░░░░░░░░░░░██\n\
░░░░░░░░░░█▒▒▒▒▒▒▒▒███████████████▒▒█\n\
░░░░░░░░░█▒▒███████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█\n\
░░░░░░░░░█▒▒▒▒▒▒▒▒▒█████████████████\n\
░░░░░░░░░░████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█\n\
░░░░░░░░░░░░░░░░░░██████████████████\n\
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█\n\
██░░░░░░░░░░░░░░░░░░░░░░░░░░░██\n\
▓██░░░░░░░░░░░░░░░░░░░░░░░░██\n\
▓▓▓███░░░░░░░░░░░░░░░░░░░░█\n\
▓▓▓▓▓▓███░░░░░░░░░░░░░░░██\n\
▓▓▓▓▓▓▓▓▓███████████████▓▓█\n\
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██\n\
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█\n\
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█",
);

function MainConatiner() {
    let [date, setDate] = useState(nowDay); //달력에 표시되는 날짜
    const [comu, setComu] = useState<any[]>([]); //추천수 상위 5개 글
    const [matches, setMatch] = useState<any>([]);
    const [user, setUser] = useState<any>([]);
    const [userDetail, setUserDetail] = useState<any>(null);
    const [stad, setStad] = useState<any>(null);
    const [prediction, setPrediction] = useState<any>(null);
    const params = useParams();
    const [auth, setAuth] = useState<boolean>(false);
    function onDatechange(e: Date): void {
        dd = String(e.getDate()).padStart(2, "0");
        mm = String(e.getMonth() + 1).padStart(2, "0"); //January is 0!
        yyyy = e.getFullYear();
        nowDay = yyyy + "-" + mm + "-" + dd;
        setDate(nowDay);
    }

    useEffect(() => {
        if (getCookie("USER")) {
            setAuth(true);
        } else {
            window.alert("로그인해주세요");
            window.location.replace("/");
            setAuth(false);
        }
    }, []);

    useEffect(() => {
        if (auth) {
            axios
                .post(
                    "http://13.125.81.51:3003/apis/auth/authToken",
                    {
                        token: getCookie("USER"),
                    },
                    { withCredentials: true },
                )
                .then((response) => {
                    console.log("auth completed");
                    if (response.data !== -3) {
                        console.log(response.data);
                        setUser(response.data);
                    } else if (response.data === -3 && localStorage.refreshToken) {
                        window.alert("refreshing...");
                        axios
                            .post(
                                "http://13.125.81.51:3003/apis/auth/refreshToken",
                                {
                                    refreshToken: localStorage.refreshToken,
                                },
                                { withCredentials: true },
                            )
                            .then((res) => {
                                if (res.data !== -3) {
                                    window.alert("refreshed");
                                    console.log(res.data.token);
                                    setCookie("USER", res.data.token, {
                                        path: "/",
                                        secure: false,
                                        sameSite: "lax",
                                    });
                                    localStorage.setItem("refreshToken", res.data.refreshToken);
                                    window.location.reload();
                                } else {
                                    removeCookie("USER");
                                    localStorage.removeItem("refreshToken");
                                    alert("세션이 만료되었습니다. 다시 로그인해 주세요");
                                }
                            });
                    }
                });
        }
    }, [auth]);

    useEffect(() => {
        if (user.user_id) {
            axios.get(`http://13.125.81.51:3003/apis/user/getUser/${user.user_id.toString()}`, {}).then((res) => {
                setUserDetail(res.data[0]);
            });
        }
    }, [user.user_id]);

    useEffect(() => {
        if (userDetail) {
            axios.get(`http://13.125.81.51:3003/apis/board/getBoard?teamid=${userDetail.myteam}`, {}).then((response) => {
                setComu(response.data.reverse().slice(0, 10));
            });

            axios.get(`http://13.125.81.51:3003/apis/football/getStadiumInfo?teamid=${userDetail.myteam}`, {}).then((response) => {
                setStad(response.data[0]);
            });

            axios.get(`http://13.125.81.51:3003/apis/football/getPredictInfo?teamid=${userDetail.myteam}`, {}).then((response) => {
                setPrediction(response.data[0]);
            });
        }
    }, [userDetail]);

    useEffect(() => {
        if (auth) {
            axios.get(`http://13.125.81.51:3003/apis/football/getMatch?date=${date.toString()}`, {}).then((response) => {
                setMatch(response.data);
            });
        }
    }, [date]);
    //NavBar
    function logOut() {
        removeCookie("USER");
        localStorage.removeItem("refreshToken");
        window.alert("로그아웃 되었습니다.");
        window.location.replace("/");
    }
    //NavBar

    return <MainPresenter matches={matches} params={params} onDatechange={onDatechange} comu={comu} user={user} userDetail={userDetail} prediction={prediction} stad={stad} logOut={logOut} />;
}

export default MainConatiner;
