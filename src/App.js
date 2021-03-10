import { useEffect, useState } from "react";
import "./App.css";
import CustomBtn from "./components/CustomBtn";
import { qiuz as quizs } from "./data";

function App() {
    const [index, setIndex] = useState(0)
    const [qiuz, setQuiz] = useState(quizs)
    const [timer, setTimer] = useState(0)
    const [second, setSecond] = useState(0)
    const answerFunc = (option) => {
        const updatedQuiz = qiuz?.map(data => {
            if(data.id === index + 1 && !data?.answered) {
                data.answer = data.option === option
                data.answered = true
            }
            return data
        })

        setQuiz(updatedQuiz)
        if(index >= qiuz?.length -1) {
            setIndex(qiuz?.length)
            return
        }
        setIndex(c => c += 1)
    }

    const next = () => {
        setIndex(c => c += 1)
        if(index >= qiuz?.length - 2) {
            setIndex(qiuz?.length - 1)
            return
        }
    }

    const prev = () => {
        setIndex(c => c -= 1)
        if(index < 0) {
            // setIndex(qiuz?.length - 1)
            setIndex(0)
            return
        }
    }

    useEffect(() => {
        let time
        if(timer <= 180) {
            time = setInterval(() => {
                setTimer(c => c += 1)
                setSecond(c => c += 1)
                if(second == 59) {
                    setSecond(0)
                }
            }, 1000)
        }else {

        }

        return () => clearInterval(time)
    }, [])

  return (
    <div>
      <section className='screen outline'>
        <div className='inner-screen'>
          <div className='countdown'>
            {/* <img src='assets/icon/clock.svg' alt='clock' /> */}
            <span>{Math.floor(timer / 60)} : {(timer % 60)}</span>{" "}of{" "}
            <span>3</span>
          </div>
          <div className='num-question'>
            Question <span>{index === qiuz?.length ? qiuz?.length : index + 1}</span> of <span>{qiuz?.length}</span>
          </div>
          <div className='question'>
            {/* {qiuz?.map(data => {
                        return (
                            <p className='question_p'>{data?.question}</p>
                        )
                    })} */}
            <p>{qiuz[index]?.question}</p>
            {/* <p>What is the question of this esxrdctfvgykbhjlkn jwzesxdrchf tgvjhkbjlkmlwze sxdrcfgvhbjnkmlsdxfcgv hbjnkml aszd
                    azsdfcgvhbjdbfshdgahh aggkjrewawfaw?</p> */}
          </div>
          <div className='dots'>
            {qiuz?.map((data) => {
              const success = data?.answer && data?.answered
              const fail = !data?.answer && data?.answered
              const notAnswered = !data?.answer && !data?.answered
              return (
                <div
                onClick={() => {
                    if(success) {

                    }
                }}
                  className={
                    success
                      ? "dots_green"
                      : fail
                      ? "dots_red"
                      : "dots_grey"
                  }
                />
              );
            })}
          </div>
        </div>
      </section>
      <section className='options'>
        <CustomBtn cname='option__button outline' onClick={() => answerFunc('A')}> A. Option A</CustomBtn>
        <CustomBtn cname='option__button outline' onClick={() => answerFunc('B')}> B. Option B</CustomBtn>
        <CustomBtn cname='option__button outline' onClick={() => answerFunc('C')}> C. Option C</CustomBtn>
        <CustomBtn cname='option__button outline' onClick={() => answerFunc('D')}> D. Option D</CustomBtn>
      </section>
      <section className='prev-next'>
        <CustomBtn cname='previous' onClick={() => prev()}>Previous</CustomBtn>
        <CustomBtn cname='next' onClick={() => next()}>Next</CustomBtn>
      </section>
    </div>
  );
}

export default App;
