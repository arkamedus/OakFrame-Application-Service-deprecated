import doc = Mocha.reporters.doc;

export class Listener {
    /** @private {boolean} */

    public _connected = false;
    public root = window;
    public _isListening = false;
    private setLanguage;
    private _has_initialized = false;
    private controller;

    isListening() {
        return this._isListening;
    }

    update (){
        let display;

        if (document.getElementById('display')){
            display = document.getElementById('display');

            display.innerHTML = '<i class="fas fa-microphone'+(!this._isListening?"-slash":'')+' fa-fw fa-2x"></i>';
        }
    }

    public start(controller?) {

        const self = this;
        const synth = window['speechSynthesis'];
        let utterance = new window['SpeechSynthesisUtterance']();
        utterance.lang = 'en-US';

        function synthVoice(text, cb) {
            utterance = new window['SpeechSynthesisUtterance'](text);
            utterance.rate = 1.5;
            //utterance.text = text;
            synth.speak(utterance);
            utterance.onend = function (evt) {
                cb(evt);
            }
        }

        /**
         * @nocollapse
         */
        let recognition = null;
        recognition = (window['webkitSpeechRecognition'] || window['SpeechRecognition'] ||
            window['mozSpeechRecognition'] ||
            window['msSpeechRecognition'] ||
            window['oSpeechRecognition']) || recognition;

        if (!recognition) {
            return false;
        }

        recognition = new recognition();

        var lastStartedAt = new Date().getTime();
        var autoRestartCount = 0;
        var debugState = true;

        this.setLanguage = function (lang) {
            utterance.lang = lang;
        };

        let container = document.getElementById("voicebox"), transcript, potential;
        if (!self._has_initialized) {
            transcript = document.createElement("textarea");
            transcript.style.width = "100%";
            transcript.id = "transcript";

            if (controller){
                controller.transcript.forEach(function(v){
                    let d = document.createElement('span');
                    d.innerHTML = v;
                    transcript.appendChild(d);
                });
            }

            potential = document.createElement("input");
            potential.readOnly = true;
            potential.id = "potential";
            container.appendChild(transcript);
            container.appendChild(potential);
            self._has_initialized = true;
        } else {
            transcript = document.getElementById("transcript");
            potential = document.getElementById("potential");
        }


        recognition['continuous'] = false;
        recognition['interimResults'] = true;
        //recognition['lang'] = 'sw-SW';
        //recognition['lang'] = 'de-DE';
        //recognition['lang'] = 'en-US';
        recognition['onresult'] = function (event) {

            var interim_transcript = '';
            var final_transcript = '';

            for (var i = event['resultIndex']; i < event['results'].length; ++i) {
                if (event['results'][i]['isFinal']) {

                    final_transcript += event['results'][i][0]['transcript'];
                    if (self._isListening) {
                        let sentence = document.createElement("span");
                        sentence.className = "sentence";
                        sentence.innerHTML = final_transcript + ". &nbsp; ";
                       // transcript.appendChild(sentence);
                        potential.value = "";

                        if (controller){
                            controller.transcript.push(final_transcript + ". &nbsp; ");
                        }

                        transcript.innerHTML += final_transcript + ". &nbsp; "
                        transcript.scrollTop = transcript.scrollHeight;
                        if (document.activeElement.getAttribute('type') == "text") {
                        }
                    }

                } else {
                    interim_transcript += event['results'][i][0]['transcript'];
                    potential.value = interim_transcript;
                }
            }

            if (final_transcript.indexOf('enable voice') !== -1) {
                if (!self._isListening) {
                    synthVoice('Hello Friend!', function () {
                    });
                    self._isListening = true;
                }

            }

            if (final_transcript.indexOf('set language english') !== -1) {
                recognition['lang'] = 'en-US';
            }
            if (final_transcript.indexOf('set language spanish') !== -1) {
                recognition['lang'] = 'es';
            }
            if (final_transcript.indexOf('set language german') !== -1) {
                recognition['lang'] = 'de';
            }

            if (final_transcript.indexOf('goodbye neighbor') !== -1) {
                self._isListening = false;
            }

            console.log(interim_transcript, self._isListening);

        };
        recognition['onend'] = function () {

            var timeSinceLastStart = new Date().getTime() - lastStartedAt;
            autoRestartCount += 1;
            if (autoRestartCount % 10 === 0) {
                if (debugState) {
                    console.warn('Speech Recognition is repeatedly stopping and starting. See http://is.gd/annyang_restarts for tips.');
                }
            }
            if (timeSinceLastStart < 10000) {
                setTimeout(function () {
                    lastStartedAt = new Date().getTime();
                    recognition.start();
                }, Math.max(1, 5000 - timeSinceLastStart));
            } else {
                recognition.start();
            }
        };
        recognition.start();
    }
}
