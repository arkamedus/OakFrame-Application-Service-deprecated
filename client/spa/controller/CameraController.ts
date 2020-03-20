import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import {AccountHandler} from "../../../lib/model/AccountHandler";
import CameraView from '../view/Camera.html';
import HeaderView from "../view/Header.html";
import {generateStateTemplate} from "../app";

// @ts-ignore
//Declare this variables so they are visible in your code
declare var window: any;
declare var tracking: any;
import {ApplicationRouter} from "../../../lib/model/ApplicationRouter";

export class CameraController extends Module {

    use = (app?: ApplicationRouter) => {
        app.focusModule(this);
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate()) +
                (new StringTemplate(CameraView)).apply(generateStateTemplate());
            resolve();
        });

    };

    focus = (app?: ApplicationRouter) => {
        let cover: HTMLCanvasElement = document.querySelector('#cover');
        let video: HTMLVideoElement = document.querySelector('.handsome');
        let canvas: HTMLCanvasElement = document.querySelector('#paint');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        let face:any = new Image();
        face.ready = false;
        face.onload = function(){
            face.ready = true;
        };
        face.src='/tracking/img/dog.png';


        console.log('setup snap');
        let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        let strip = document.querySelector('.strip');

        var front = false;

        async function go() {
            // first ask for get user media
            let stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {width: 1920, height: 1080, facingMode: (front ? "user" : "environment")}
            });

            let videoTracks = stream.getVideoTracks();
            //console.log('Got stream with constraints:', constraints);
            console.log(`Using video device:`, videoTracks[0]);
            video.srcObject = stream;

            //
            //canvas.height = video.height;

        }

        function takePhoto() {
            console.log('Taking photo!', video.videoWidth, video.videoHeight);
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            const data = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            // link.href = data;
            link.setAttribute('download', 'handsome');
            link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
            strip.insertBefore(link, strip.firstChild);


            //Snap.thread.blocks.push(new ThreadBlock("image",data));


        }

        console.log('got here 222');


        document.getElementById('take').onclick = function () {
            takePhoto();
        };


        document.getElementById('flip-button').onclick = function () {
            front = !front;
            //constraints = {audio: false, video: {width: 1920, height: 1080,facingMode: (front ? "user" : "environment")}};
            go().catch(err => {
                alert(err.message);
            });
        };

        document.getElementById('close').onclick = function () {
            console.log('creatign thread');
            //	Main.focus(Landing);
            //	Landing.render(document.getElementById('neighbors'));

            /* let modal = new NotModal(document.getElementsByClassName('container')[0], template_explore.newScriptModal, View.getViewData(Snap.thread), function(){
                 Main.focus(Explore);
                 Explore.render(document.getElementById('neighbors'));
             });*/
        };


        console.log('got here QQQ');

//var constraints = {audio: false, video: {width: 1920, height: 1080,facingMode: (front ? "user" : "environment")}};

        go().then(function () {
            //document.getElementById('overlay').height = video.videoHeight;
            //document.getElementById('overlay').width = video.videoWidth;
        }).catch(err => {

            alert(err.message);
        });
/*
        var tracker = new tracking.LandmarksTracker();
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);

        console.log('got here AAA');

        tracking.track('#vid', tracker);

        console.log('got here BBB');

        tracker.on('track', function (event) {
            try {
                canvas.height = video.videoHeight;
                canvas.width = video.videoWidth;
            } catch (e) {

            }

            console.log('got here CCC');

            let context = ctx;

            context.clearRect(0, 0, canvas.width, canvas.height);

            if (!event.data) return;

            event.data.faces.forEach(function (rect, faceIndex) {
                context.strokeStyle = '#a64ceb';
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                context.font = '11px Helvetica';
                context.fillStyle = "#fff";
                context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

                //var faceLandmarks = event.data.landmarks[faceIndex];

                if(face.ready) {
                    context.drawImage(face, rect.x - 40, rect.y - 40 - (rect.width / 4), rect.width + 80, rect.height + 80)
                }

            });

        });*/

    }

}