export class Quiz {

    constructor(response) {


        this.inCorrect = document.getElementById("inCorrect")
        this.Correct = document.getElementById("Correct")

        this.response = response
        this.numberOfQuestion = response.length
        this.nextBtn = document.getElementById("next")
        this.nextBtn.addEventListener("click", this.nextt.bind(this))
            // console.log(this.numberOfQuestion);
        this.qurrentQuestion = 0
        this.showQuestion()
        this.score = 0
        this.showScore = document.getElementById("score")
        this.tryBtn = document.getElementById("tryBtn")
        this.tryBtn.addEventListener("click", this.return.bind(this))


    }

    showQuestion() {
        document.getElementById("question").innerHTML = this.response[this.qurrentQuestion].question
        document.getElementById("currentQuestion").innerHTML = this.qurrentQuestion + 1
        document.getElementById("totalNumberOfQuestions").innerHTML = this.numberOfQuestion

        let answers = [this.response[this.qurrentQuestion].correct_answer, ...this.response[this.qurrentQuestion].incorrect_answers]
        console.log(this.response[this.qurrentQuestion].correct_answer);

        function shuffle(array) {
            let currentIndex = array.length,
                randomIndex;

            // While there remain elements to shuffle.
            while (currentIndex != 0) {

                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]
                ];
            }

            return array;
        }
        shuffle(answers)
        let temp = ""
        for (let i = 0; i < answers.length; i++) {
            temp += ` <div class="form-check mt-3 p-2">
                        <label class="form-check-label ">
                            <input type="radio" class="form-check-input" name="answer" id="" value="${answers[i]}" >
                           ${answers[i]}
                        </label>
                    </div>
                    `
        }

        document.getElementById("rowAnswer").innerHTML = temp;
    }
    nextt() {
        let userAnswerElement = document.getElementsByName("answer")
        if ([...userAnswerElement].filter(ele => ele.checked).length == 1) {
            $("#alert").fadeOut(500)
            this.check();
            this.qurrentQuestion++;

            if (this.qurrentQuestion < this.numberOfQuestion) {

                this.showQuestion()

            } else {
                $("#quiz").fadeOut(500, () => {
                    $("#finish").fadeIn(500)
                })


            }




            // console.log(this.qurrentQuestion);
        } else {
            $("#alert").fadeIn(500)
        }
    }

    check() {
        let userAnswerElement = document.getElementsByName("answer")

        let userAnswer = [...userAnswerElement].filter(ele => ele.checked)[0].value;

        if (userAnswer == this.response[this.qurrentQuestion].correct_answer) {
            this.score++;
            $("#Correct").fadeIn(300, () => {
                $("#Correct").fadeOut(500);
                this.showScore.innerHTML = this.score
            })
        } else {

            $("#inCorrect").fadeIn(300, () => {
                $("#inCorrect").fadeOut(300);

            })
        }
    }


    return () {

        $("#finish").fadeOut(500, () => {
            $("#setting").fadeIn(500)
        })

    }
}