import React, { useState, useEffect, useRef } from 'react';
import ListRelatedArticle from './ListRelatedArticle/ListRelatedArticle';
import CommentArea from './commentArea/CommentArea';
import Header from './Header/Header';
import BodyFrame from './BodyFrame/BodyFrame';
import WrapAuthor from './WrapAuthor/WrapAuthor';
import FooterBar from './FooterBar/FooterBar';
import Nav from '../../components/Nav/Nav';
import './DetailPage.scss';

function DetailPage() {
  const [relaredListUserData, setRelaredListUserData] = useState([]);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [inputComment, setInputComment] = useState([]);
  const [commentValue, setCommentValue] = useState('');
  const [headerData, setHeaderData] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const [footerBarData, setFooterData] = useState([]);
  const [contentBodyData, setContentData] = useState([]);
  const [commentLocation, setCommentLocation] = useState(0);

  useEffect(() => {
    fetch('/Data/bodyFrame.json')
      .then(res => res.json())
      .then(res => setContentData(res));
  }, []);

  const onChange = e => {
    setCommentValue(e.target.value);
  };

  const onChangePostContent = postId => {
    fetch('/Data/Content.json')
      .then(res => res.json())
      .then(res => {
        const data = res[postId];
        setHeaderData(data.header);
        setContentData(data.contents);
      });
  };

  const commentToMove = () => {
    window.scrollTo({ top: 2000, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetch('/Data/headerData.json')
      .then(res => res.json())
      .then(res => setHeaderData(res));

    fetch('/Data/listRelatedData.json')
      .then(res => res.json())
      .then(res => setRelaredListUserData(res));

    fetch('/Data/WrapAuthor.json')
      .then(res => res.json())
      .then(res => setAuthorData(res));

    fetch('/Data/FooterBar.json')
      .then(res => res.json())
      .then(res => setFooterData(res));
  }, []);

  const addComment = () => {
    if (commentValue.trim().length === 0) return;

    setInputComment(element => [
      ...element,
      {
        id: inputComment.length + 1,
        userName: 'harry',
        userComment: commentValue,
      },
    ]);

    setCommentValue('');
  };

  const deleteComment = id => {
    setInputComment(inputComment.filter(commentList => commentList.id !== id));
  };

  return (
    <div className="detailPage">
      <Nav commentToMove={commentToMove} />
      <Header pageHeaderData={headerData} />
      <div className="wrapBodyFrame">
        <BodyFrame
          setIsCommentOpen={setIsCommentOpen}
          isCommentOpen={isCommentOpen}
          inputComment={inputComment}
          contentBodyData={contentBodyData}
        />
        {isCommentOpen && (
          <CommentArea
            addComment={addComment}
            deleteComment={deleteComment}
            inputComment={inputComment}
            onChange={onChange}
            value={commentValue}
          />
        )}
        <WrapAuthor authorData={authorData} />
        <section className="wrapArticle">
          <ListRelatedArticle relatedData={relaredListUserData} />
        </section>
        <div className="wrapFooterBanner">
          <img
            src="/images/DetailPage/footerImage.png"
            className="footerImage"
            alt="하단 배너"
          />
        </div>
      </div>
      <FooterBar
        footerBar={footerBarData}
        onChangePostContent={onChangePostContent}
      />
    </div>
  );
}

export default DetailPage;
