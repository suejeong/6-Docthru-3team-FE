"use client";

import Container from "@/components/container/PageContainer";
import Gnb from "@/layout/Gnb";
import titleDoct from "@/assets/img/img_title_doct.svg"
import Image from "next/image";
import Link from "next/link";
import iconChallenge from "@/assets/icon/ic_landing_challenge.svg";
import iconHeart from "@/assets/icon/ic_landing_heart.svg";
import iconFeedback from "@/assets/icon/ic_landing_feedback.svg";
import bgSm from "@/assets/img/bg_sm.svg"
import bgMd from "@/assets/img/bg_md.svg"
import bgLg from "@/assets/img/bg_lg.svg"
import imgChallenge from "@/assets/img/img_challengelist.svg"
import imgWork from "@/assets/img/img_work.svg"
import imgFeedback from "@/assets/img/img_feedback.svg"
import imgChallengeSm from "@/assets/img/img_challengelist_sm.svg"
import imgWorkSm from "@/assets/img/img_work_sm.svg"
import imgFeedbackSm from "@/assets/img/img_feedback_sm.svg"
import { useEffect, useState } from "react";



const list = {
  listDiv: "flex max-w-7xl w-[375px] md:w-[990px] justify-between flex-col md:flex-row gap-3 pt-10 sm:pt-16 md:pt-11",
  listDivTitle: "font-bold text-black text-xl sm:text-2xl pt-2 pb-3",
  listDivSubTitle: "font-normal text-[#676767] text-base",
  listImage: "flex justify-center"
}


export default function Home() {
  const [bgImage, setBgImage ] = useState(bgSm.src)
  // 랜딩에선 따로 헤더 넣어주기
  useEffect(() => {
    const width = window.innerWidth;
    const updateBgImage = () => {
      if(width >= 1280 ) {
        setBgImage(bgLg.src);
      } else if (width >= 768) {
        setBgImage(bgMd.src);
      } else {
        setBgImage(bgSm.src);
      }
    };

    updateBgImage();
    window.addEventListener("resize", updateBgImage);
    return() => window.removeEventListener("resize", updateBgImage);
  }, [])


  return (
    <Container
      maxWidth="w-full"
      padding="p-0 sm:p-0 lg:p-0"
      className="flex flex-col"
    >
      <Gnb userRole="guest" />
      <Container 
        maxWidth="w-full" 
        className="bg-brand-black flex flex-col items-center"
        style={
          {
            backgroundImage:`url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        }
      >
        <div className="w-[300px] h-62 sm:h-70 py-12 flex flex-col items-center " >
          <Image src={titleDoct} alt="docthru" />
          <div className="mt-3 sm:mt-4 text-white font-semibold text-xl sm:text-2xl text-center " >
            함께 번역하며 성장하는<br />
            개발자의 새로운 영어 습관
          </div>
          <Link href="/signIn" className="flex justify-center items-center mt-6 text-sm text-base font-semibold rounded-[10px] w-27 h-8 sm:h-10 bg-white text-gray-800">번역 시작하기</Link>
        </div>
      </Container>
      <Container maxWidth="w-full" className="flex flex-col items-center justify-start " >
          <div className={`${list.listDiv} mt-5  md:mt-12`}>
            <div>
              <Image src={iconChallenge} alt="챌린지 아이콘" />
              <div className={`${list.listDivTitle}`}>혼자서는 막막했던 번역,<br />챌린지로 함께 완성하기</div>
              <div className={`${list.listDivSubTitle}`}>중요한 건 꺾이지 않는 마음! 동료들과 함께<br />기술 문서를 번역해 보세요.</div>
            </div>
            <div className={`${list.listImage} mt-3`}>
              {/* 작은 화면용 이미지 */}
              <Image src={imgChallengeSm} alt="챌린지 리스트" className="block sm:hidden" />
              {/* 큰 화면용 이미지 */}
              <Image src={imgChallenge} alt="챌린지 리스트" className="hidden sm:block" />
            </div>
          </div>
          <div className={`${list.listDiv} border-b-1 border-t-1 border-dashed border-[#b2b2b2]`}>
            <div>
              <Image src={iconHeart} alt="챌린지 아이콘" />
              <div className={`${list.listDivTitle}`}>내가 좋아하는 기술 번역,<br />내가 필요한 기술 번역</div>
              <div className={`${list.listDivSubTitle}`}>이미 진행 중인 번역 챌린지에 참여하거나,<br />새로운 번역 챌린지를 시작해 보세요.</div>
            </div>
            <div className={`${list.listImage}`}>
              <div>
                {/* 작은 화면용 이미지 */}
                <Image src={imgWorkSm} alt="작업물 리스트" className="block sm:hidden" />
                {/* 큰 화면용 이미지 */}
                <Image src={imgWork} alt="작업물 리스트" className="hidden sm:block" />
              </div>
            </div>
          </div>
          <div className={`${list.listDiv} `}>
            <div >
              <Image src={iconFeedback} alt="챌린지 아이콘" />
              <div className={`${list.listDivTitle}`}>피드백으로 함께 성장하기</div>
              <div className={`${list.listDivSubTitle}`}>번역 작업물에 대해 피드백을 주고 받으며<br />영어 실력은 물론, 개발 실력까지 키워 보세요</div>
            </div>
            <div className={`${list.listImage} mt-9 md:mr-7 `}>
              {/* 작은 화면용 이미지 */}
              <Image src={imgFeedbackSm} alt="피드백" className="block sm:hidden" />
              {/* 큰 화면용 이미지 */}
              <Image src={imgFeedback} alt="피드백" className="hidden sm:block" />
            </div>
          </div>
          <div className="flex flex-col items-center">
              <div className="mt-13 md:mt-24 text-black font-semibold text-lg sm:text-lg text-center">
                  함께 번역하고 성장하세요!
              </div>
              <Link href="/signIn" className="flex justify-center items-center mt-3 mb-20 text-sm sm:text-base font-semibold rounded-xl w-30 sm:w-38 h-10 sm:h-12 bg-brand-black text-white">작업 도전하기</Link>
            </div>
      </Container>
    </Container>
  );
}
