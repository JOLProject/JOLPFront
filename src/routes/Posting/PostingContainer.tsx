import PostingPresenter from './PostingPresenter';
import axios from 'axios';
import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
// @ts-ignore
import { getCookie } from 'Cookie.ts';
import React from 'react';

function PostingConatiner () {
    const navigate = useNavigate();
    const [user,setUser] = useState<any>([]);
    const [userDetail,setUserDetail] = useState<any>(null);
    let [title, setTitle] = useState("");
    let [content, setContent] = useState("");
    let [anony, setAnony] = useState(false);

    function auth(){
        if(getCookie('USER')){
          return true;
        }else{
          window.alert('로그인해주세요');
          window.location.replace('/');
          return false;
        };
      }

    useEffect(()=>{
        if(auth()){
            axios.post('http://13.125.107.215:3003/apis/auth/authToken', {
            token:getCookie('USER')
            },{withCredentials:true})
            .then((response)=>{
            setUser(response.data);
            });
        }  
    },[auth()]); 

    useEffect(()=>{
        if(user){
        axios.post('http://13.125.107.215:3003/apis/user/getUserDetail', {
        userid:user.user_id
        },{withCredentials:true})
        .then((res)=>{
            setUserDetail(res.data[0]);
        });
    } 
    },[user]);

    const titleChange = useCallback(
        (e) => {
            setTitle(e.target.value);
        },
        [title]
    )

    const contentChange = useCallback(
        (e) => {
            setContent(e.target.value);
        },
        [content]
    )

    const anonyChange = useCallback(
        (e) => {
            anony = !anony;
            setAnony(anony);
        },
        [anony]
    )

    function submit(){
        content.replace('<oembed','<Oembed');
        content.replace('</oembed>','</Oembed>');
        content.replace('<figure','<Figure');
        content.replace('</figure>','</Figure>');
        console.log(content);
        if(userDetail){
            axios.post('http://13.125.107.215:3003/apis/board/createBoard',{
            title:title,
            categoryid:0,
            content:content,
            isanony:anony ? 0:1,
            team_id:userDetail.myteam,
            },{
                headers:{
                    token:getCookie('USER')
                }
            })
            .then((response)=>{
                console.log(response);
                if(response.status===200){
                    window.alert('posing completed!!');
                    navigate(`/community/${userDetail.myteam}/1`);
                }else{
                    window.alert('status not 200');
                    }
                })
            }else{
                window.alert('userdetail none');
            }
    }

    return (
        <PostingPresenter
        user={user}
        userDetail={userDetail}
        auth={auth}
        title={title}
        setTitle={setTitle}
        titleChange={titleChange}
        content={content}
        setContent={setContent}
        contentChange={contentChange}
        anony = {anony}
        setAnony = {setAnony}
        anonyChange={anonyChange}
        submit = {submit} />
    )
}

export default PostingConatiner;