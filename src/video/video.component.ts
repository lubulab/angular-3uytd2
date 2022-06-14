import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';
import { Router } from '@angular/router';
import { MockService } from '../app/mock.service';
import { Utils } from './Utils';

const delayTime = (time) => new Promise((resolve) => setTimeout(resolve, time));
const getDimensions = () => {
  const { innerHeight, innerWidth } = window;
  return { width: Math.min(innerWidth, 480), height: innerHeight - 100 };
};

const isMimeTypeSupported = (type: string) =>
  MediaRecorder.isTypeSupported(type);
declare const MediaRecorder: any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  @ViewChild('inputFile', { static: false }) inputFile: ElementRef;
  @ViewChild('video', { static: false }) videoElementRef!: ElementRef;
  recorder: any;
  blob: any;
  state = 'recording';
  counter: number = 0;
  showInstructionsModal: boolean;
  instruction: string;
  videoDuration: number;
  options: any;
  disableAvvia: boolean = true;
  key: string;
  deviceType: string;
  videoElement!: HTMLVideoElement;
  stream!: MediaStream;
  recordVideoElement!: HTMLVideoElement;
  mediaRecorder: any;
  recordedBlobs: Blob[] = [];
  istruzioneAttuale!: string;
  isRecording: boolean = false;
  count: number = 1;
  timer!: any;
  mimeType!: string;
  videoInstructions: any;

  constructor(
    private sanitizer: DomSanitizer,
    private platform: Platform,
    private mockService: MockService,
    private router: Router
  ) {}

  private getDeviceType() {
    if (this.platform.IOS) {
      this.deviceType = 'IOS';
    } else if (this.platform.ANDROID) {
      this.deviceType = 'ANDROID';
    } else {
      this.deviceType = null;
    }
  }

  private initializeMediaRecorder() {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: { facingMode: 'user', frameRate: 30 },
      })
      .then(async (stream) => {
        this.videoElement = this.videoElementRef.nativeElement;
        this.videoElement.setAttribute('autoplay', '');
        this.videoElement.setAttribute('muted', '');
        this.videoElement.setAttribute('playsinline', '');
        this.videoElement.width = window.screen.availWidth;
        this.stream = stream;
        this.videoElement.srcObject = this.stream;
        this.disableAvvia = false;
      });
  }

  async ngOnInit() {
    this.options = { ...getDimensions() };
    this.getDeviceType();
    this.initializeMediaRecorder();
  }

  showInstructions() {
    let nmoves = '3';
    let sessionId = 'EIRFORPAYBACK' + Math.floor(Math.random() * 5 + 0); //change upper limit to 1000 for realtime
    this.mockService.livenessInit(sessionId, nmoves).subscribe((res) => {
      if (res && res['json']) {
        this.videoInstructions = res['json'].moves;
        this.startRecording();
      }
    });
  }

  showInstructionsSpeech() {
    this.initializeSpeech();
    let nmoves = '3';
    let sessionId = 'EIRFORPAYBACK' + Math.floor(Math.random() * 5 + 0); //change upper limit to 1000 for realtime
    this.mockService.livenessInit(sessionId, nmoves).subscribe((res) => {
      if (res && res['json']) {
        this.videoInstructions = res['json'].moves;
        this.startRecording();
      }
    });
  }

  initializeSpeech() {
    const msg = new SpeechSynthesisUtterance('test');
    msg.rate = 1.5;
    speechSynthesis.speak(msg);
  }

  startRecording = async () => {
    this.state = 'recording';
    this.mimeType = 'video/webm';
    if (!isMimeTypeSupported(this.mimeType)) {
      this.mimeType = 'video/mp4; codecs="avc1.424028, mp4a.40.2"';
    }
    let options: any = { mimeType: this.mimeType };
    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options);
    } catch (err) {
      console.log(err.message);
    }
    this.mediaRecorder.width = this.options.width;
    this.mediaRecorder.height = this.options.height;
    this.mediaRecorder.start(); // collect 100ms of data
    this.isRecording = true;
    this.startTimer();
  };

  async startTimer() {
    this.showInstructionsModal = true;
    let delayInterval = (12 / this.videoInstructions.length) * 1000;
    for (let instruction of this.videoInstructions) {
      this.instruction = Utils.getInstruction(instruction.toUpperCase());
      await delayTime(delayInterval);
    }
    console.log('done');
  }

  bnlStore() {
    Utils.bnlStore();
  }

}
