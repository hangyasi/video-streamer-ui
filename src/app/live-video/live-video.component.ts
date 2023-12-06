import {AfterViewInit, Component} from '@angular/core';
import {AuthenticationService} from "../auth/authentication.service";

@Component({
  selector: 'app-live-video',
  templateUrl: './live-video.component.html',
  styleUrls: ['./live-video.component.css']
})
export class LiveVideoComponent implements AfterViewInit {

  conn: WebSocket;
  peerConnection: RTCPeerConnection;
  localStream: MediaStream;
  remoteStream: MediaStream;
  remoteUser: string = "";
  constructor(public authService: AuthenticationService){}

  ngAfterViewInit(): void {
    this.conn = new WebSocket('ws://localhost:8080/signaling');
    this.conn.onopen = () => {
      console.log("Kapcsolódva a signaling szerverhez");
    };

    this.conn.onmessage = (msg) => {
      console.log("Got message", msg.data);
      const content = JSON.parse(msg.data);
      const data = content.data;
      switch (content.event) {

        case "offer":
          this.handleOffer(data.offer);
          this.remoteUser = data.username;
          break;
        case "answer":
          this.remoteUser = data.username;
          this.handleAnswer(data.answer);
          break;
        case "candidate":
          this.handleCandidate(data);
          break;
        default:
          break;
      }
    };
  }

  send(message: any) {
    this.conn.send(JSON.stringify(message));
  }

  initialize() {
    const servers = {
      iceServers: [
        {
          urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
      ],
      iceCandidatePoolSize: 10,
    };
    this.peerConnection = new RTCPeerConnection(servers);

    const constraints = {
      video: {
        frameRate: {
          ideal: 25,
          max: 30
        },
        width: 1280,
        height: 720,
        facingMode: "user"
      },
      audio: true
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          this.localStream = stream
          this.localStream.getTracks().forEach((track) => {
            this.peerConnection.addTrack(track, this.localStream);
          });
          this.remoteStream = new MediaStream();
          this.peerConnection.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
              this.remoteStream.addTrack(track);
            });
          };

        })
        .catch((err) => {  });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.send({
          event : "candidate",
          data : event.candidate
        });
      }
    };
  }

  createOffer = () => {
    this.peerConnection.createOffer((offer) => {
      this.send({
        event : "offer",
        data : {offer: offer, username: this.authService.getUserName()}
      });
      this.peerConnection.setLocalDescription(offer);
    }, (error) => {
      alert("Error creating an offer");
    });
  }

  handleOffer(offer: any) {
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    this.peerConnection.createAnswer((answer) => {
      this.peerConnection.setLocalDescription(answer);
      this.send({
        event : "answer",
        data : {answer: answer, username: this.authService.getUserName()}
      });
    }, (error) => {
      alert("Error creating an answer");
    });
  };

  handleCandidate(candidate: any) {
    this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  };

  handleAnswer(answer: any) {
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    console.log("Sikeresen kapcsolódva egy másik klienshez");
  };

  closeConnection() {
    this.conn.close();
    this.peerConnection.close();
    this.remoteStream.getTracks().forEach((track) => track.stop())
    this.localStream.getTracks().forEach((track) => track.stop())
    this.remoteUser = ""
  }
}
