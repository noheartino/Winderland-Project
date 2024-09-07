import React from 'react'
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

export default function Hato() {

    const router = useRouter();
    const [nowstep, setstep] = useState(0)
    const [firstnum, setfirstnum] = useState(0)
    const [secondnum, setsecondnum] = useState(0)
    const [numsec, setnumsec] = useState(Math.floor(Math.random() * (15 - 3 + 1)) + 3)


    const clickstep = () => {
        setstep(nowstep + 1)
        console.log(nowstep);
    }

    const selectcard = () => {
        const pokerResult1 = document.querySelector(".pokerResult1")
        const resultcard1 = document.querySelector(".resultcard1")
        const numis = Math.floor(Math.random() * (15 - 3 + 1)) + 3;
        setfirstnum(numis)
        setTimeout(() => {
            pokerResult1.classList.add("active")
        }, 500);
        setTimeout(() => {
            resultcard1.classList.add("active")
        }, 1000);
    }

    const selectcard_sec = () => {
        const pokerResult2 = document.querySelector(".pokerResult2")
        const resultcard2 = document.querySelector(".resultcard2")
        if(numsec === firstnum){
            setnumsec(15)
            setsecondnum(numsec)
        }
        setsecondnum(numsec)
        setTimeout(() => {
            pokerResult2.classList.add("active")
        }, 500);
        setTimeout(() => {
            resultcard2.classList.add("active")
        }, 1000);
    }

    const removearea = (e) => {
        setstep(nowstep + 1)
        e.target.classList.remove("active")
    }

    const getGreeting = (num) => {
        switch (num) {
            case 3:
                return 3;
            case 4:
                return 4;
            case 5:
                return 5;
            case 6:
                return 6;
            case 7:
                return 7;
            case 8:
                return 8;
            case 9:
                return 9;
            case 10:
                return 10;
            case 11:
                return 11;
            case 12:
                return 12;
            case 13:
                return 13;
            case 14:
                return 1;
            case 15:
                return 2;
            default:
                return 0;
        }
    };


    const hato = {
        0: '[ 請點擊以開始劇情... ]',
        1: '嘿~ 你撞到我了!!',
        3: '算了! 沒空理你這人類 ...',
        4: '啊!!! 媽媽他們飛走了~ 怎麼辦啊?',
        6: '人類... 其實我不緊張~ \n因為這整個莊園是我家!',
        8: '媽媽他們應該是去發傳單了~ \n我們正在推廣我們的酒莊，你來跟我玩個小遊戲吧~',
        10: '我這裡有十三張撲克牌，請你隨機抽取一張',
        12: '我們要進行的是比大小，會用你抽取的撲克牌來比較',
        15: '呵呵... 要抽的並不是我...',
        17: '要抽牌的還是你自己，你要打敗的是剛才的自己!!',
        19: '不然如果你輸了，我怕你怪是我在動手腳 \n呵呵，這下沒有藉口了吧~',
        21: '我這裡有時十二張撲克牌，請你隨機抽取一張',
        23: '媽媽他們也快要回來了，我也要為明天的...準備...',
        24: '我先送你回首頁囉~',
        26: '...可是下次再見時，我應該記不得你了',
        28: '抱歉，我也不想這樣...我不該說太多',
        30: '我大概知道...我跟媽媽走失了好多次，抽了好多的牌...'
    }

    const displayis = {
        0: 'hide',
        1: 'hide',
        2: '',
        3: 'hide',
        4: 'hide',
        5: '',
        6: 'hide',
        7: '',
        8: 'hide',
        9: '',
        10: 'hide',
        11: 'hide',
        12: 'hide',
        13: '',
        14: '',
        15: 'hide',
        16: '',
        17: 'hide',
        18: '',
        19: 'hide',
        20: '',
        21: 'hide',
        22: 'hide',
        23: 'hide',
        24: 'hide',
        25: '',
        26: 'hide',
        27: '',
        28: 'hide',
        29: '',
        30: 'hide',
        31: '',
        32: ''
    }

    const people = {
        2: {
            1: '抱歉了!',
            2: '所以咧?',
            3: '天哪!鴿子會說話!!!'
        },
        5: {
            1: '等一下會飛回來吧?',
            2: '你自己飛回家啊!',
            3: '天哪!!真的是鴿子在說話...'
        },
        7: {
            1: '所以他們去哪了?',
            2: '啊所以你在炫富?',
            3: '緊張的是我啊!!'
        },
        9: {
            1: '這麼突然嗎? 好啊!',
            2: '要玩甚麼遊戲?',
            3: '反正只是在作夢...就玩吧'
        },
        13: {
            1: '我抽好了!',
            2: '然後呢?',
            3: '...我輸定了!'
        },
        14: {
            1: '...所以換你抽嗎?',
            2: '啊你還不快抽?',
            3: '...我輸定了! 你快抽吧!'
        },
        16: {
            1: '什麼?',
            2: '不然你媽來抽嗎?',
            3: '難道是!?'
        },
        18: {
            1: '這甚麼玩法?',
            2: '你一定有什麼詭計!',
            3: '... ...'
        },
        20: {
            1: '鴿，你真聰明!',
            2: '小小鴿子，挺有心機',
            3: '我不會這樣啦...'
        },
        25: {
            1: '好，回首頁!',
            2: '鴿~後會有期',
            3: '我會想你的...'
        },
        27: {
            1: '哈哈，你頭腦這麼小當然記不得',
            2: '你跟金魚比賽記憶力好了!',
            3: '沒關係，我記得就好啊~'
        },
        29: {
            1: '是不是你的記憶會被重置?',
            2: '你就說啊? 有什麼原因?',
            3: '!???'
        },
        31: {
            1: 'คุณถูกขังอยู่ในพื้นที่นี้ตลอดไป',
            2: 'คุณถูกขังอยู่ในพื้นที่นี้ตลอดไป',
            3: 'คุณถูกขังอยู่ในพื้นที่นี้ตลอดไป'
        },
        32: {
            1: '等等，剛剛那不是我講的!',
            2: '我剛剛在說啥?',
            3: '我...????'
        }
    }

    const audioRef = useRef(null);
    const audioclickRef = useRef(null);
    const [hasInteracted, setHasInteracted] = useState(false);


    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }
    const handleUserInteraction = () => {
        setHasInteracted(true);
        playSound();
    }

    const clickSound = () => {
        if (audioclickRef.current) {
            audioclickRef.current.play();
        }
    }
    useEffect(() => {
        const handleClick = () => {
            clickSound();
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);



    useEffect(() => {
        const pokerArea = document.querySelector(".pokerArea");
        const pokerArea_sec = document.querySelector(".pokerArea_sec");
        const pokerArea_result = document.querySelector(".pokerArea_result");
        if (nowstep === 11) {
            pokerArea.classList.add("active");
        }
        else if (nowstep === 21) {
            pokerArea_sec.classList.add("active");
        }
        else if (nowstep === 22) {
            pokerArea_result.classList.add("active");
        }
        else if (nowstep === 33) {
            router.push("/");
        }
        else {
            pokerArea.classList.remove("active"); // 這樣在 nowstep 不等於 11 時會移除 active 類
            pokerArea_sec.classList.remove("active");
        }
    }, [nowstep]);


    const tohome = () => {
        if (nowstep === 25 || nowstep === 29) {
            router.push('/');
        }
    }
        



    useEffect(() => {

        const HatoOuterArea = document.querySelector(".HatoOuterArea");
        const kaiwa = document.querySelector(".kaiwa");
        const ishato = document.querySelector(".ishato");

        (function () {
            function start() {
                setTimeout(() => {
                    HatoOuterArea.classList.add("view");
                }, 500)
                setTimeout(() => {
                    kaiwa.classList.add("view");
                }, 2700)
                setTimeout(() => {
                    ishato.classList.add("view");
                }, 3500)
            }
            start();
        })();

    }, [])

    return (
        <>
            <div className="HatoOuterArea" onClick={handleUserInteraction}>
                <audio ref={audioRef} src="/images/hato/audio/I love sabateisyoku.mp3" loop />
                <audio ref={audioclickRef} src="/images/hato/audio/click sound.mp3" />
                <div className={`sentaku ${displayis[nowstep]}`} onClick={clickstep}>
                    <div className="sentakushi sen1" onClick={tohome}>{people[nowstep] ? people[nowstep]["1"] : ''}</div>
                    <div className="sentakushi sen2">{people[nowstep] ? people[nowstep]["2"] : ''}</div>
                    <div className="sentakushi sen3">{people[nowstep] ? people[nowstep]["3"] : ''}</div>
                </div>
                <div className="ishato" />
                <div className="kaiwa" onClick={clickstep}>
                    <div className="aite">鴿子</div>
                    <div className="kotoba" style={{ whiteSpace: 'pre-line' }}>
                        {hato[nowstep] ? hato[nowstep] : '...'} 
                        {/* {firstnum} {secondnum} */}
                    </div>
                    <div className="skip">SKIP</div>
                    <div className="kaiwaarr" />
                </div>
            </div>

            <div className='pokerArea'>
                <div className='pokercard p1' onClick={selectcard}></div>
                <div className='pokercard p2' onClick={selectcard}></div>
                <div className='pokercard p3' onClick={selectcard}></div>
                <div className='pokercard p4' onClick={selectcard}></div>
                <div className='pokercard p5' onClick={selectcard}></div>
                <div className='pokercard p6' onClick={selectcard}></div>
                <div className='pokercard p7' onClick={selectcard}></div>
                <div className='pokercard p8' onClick={selectcard}></div>
                <div className='pokercard p9' onClick={selectcard}></div>
                <div className='pokercard p10' onClick={selectcard}></div>
                <div className='pokercard p11' onClick={selectcard}></div>
                <div className='pokercard p12' onClick={selectcard}></div>
                <div className='pokercard p13' onClick={selectcard}></div>
            </div>

            <div className='pokerResult1' onClick={removearea}>
                <div className='resulttext'>抽取結果</div>
                <div className='resultcard1' style={{ background: `url(/images/hato/pok${getGreeting(firstnum)}.png) center/cover` }}></div>
            </div>

            <div className='pokerArea_sec'>
                <div className='pokercard p1' onClick={selectcard_sec}></div>
                <div className='pokercard p2' onClick={selectcard_sec}></div>
                <div className='pokercard p3' onClick={selectcard_sec}></div>
                <div className='pokercard p4' onClick={selectcard_sec}></div>
                <div className='pokercard p5' onClick={selectcard_sec}></div>
                <div className='pokercard p6' onClick={selectcard_sec}></div>
                <div className='pokercard p7' onClick={selectcard_sec}></div>
                <div className='pokercard p8' onClick={selectcard_sec}></div>
                <div className='pokercard p9' onClick={selectcard_sec}></div>
                <div className='pokercard p10' onClick={selectcard_sec}></div>
                <div className='pokercard p11' onClick={selectcard_sec}></div>
                <div className='pokercard p12' onClick={selectcard_sec}></div>
            </div>

            <div className='pokerResult2' onClick={removearea}>
                <div className='resulttext'>抽取結果</div>
                <div className='resultcard2' style={{ background: `url(/images/hato/pok${getGreeting(secondnum)}.png) center/cover` }}></div>
            </div>

            <div className='pokerArea_result' onClick={removearea}>
                <div className='resulttext'>{firstnum < secondnum ? '你贏了' : '你輸了'}</div>
                <div className='prev'>對手</div>
                <div className='next'>你</div>
                <div className='resultcard1' style={{ background: `url(/images/hato/pok${getGreeting(firstnum)}.png) center/cover` }}></div>
                <div className='resultcard2' style={{ background: `url(/images/hato/pok${getGreeting(secondnum)}.png) center/cover` }}></div>
            </div>
        </>
    )
}
