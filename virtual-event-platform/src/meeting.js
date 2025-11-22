  import React, { useEffect, Fragment } from 'react';

  const Meeting = ({ payload }) => {

    useEffect(() => {
      const startMeeting = async () => {
        const { ZoomMtg } = await import('@zoomus/websdk');
        ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.0/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareWebSDK();

        const meetingNumber = payload.meetingNumber?.toString();
        const sdkKey = payload.sdkKey?.toString();
        const sdkSecret = payload.sdkSecret?.toString();
        const role = Number(payload.role) || 0;
        const userName = payload.userName || 'Guest';
        const userEmail = payload.userEmail || '';
        const password = payload.password || '';
        const leaveUrl = payload.leaveUrl || 'https://zoom.us';

        if (!meetingNumber || !sdkKey || !sdkSecret) {
          console.error('Missing required Zoom meeting data');
          return;
        }

        ZoomMtg.generateSDKSignature({
          meetingNumber,
          sdkKey,
          sdkSecret,
          role,
          success: function (signature) {
            ZoomMtg.init({
              leaveUrl,
              success: function () {
                ZoomMtg.join({
                  meetingNumber,
                  userName,
                  signature: signature.result,
                  sdkKey,
                  userEmail,
                  passWord: password,
                  success: () => {
                    console.log('Joined meeting successfully');
                  },
                  error: (joinErr) => {
                    console.error('Join meeting error', JSON.stringify(joinErr, null, 2));
                  },
                });
              },
              error: function (initErr) {
                console.error('Init SDK error', JSON.stringify(initErr, null, 2));
              },
            });
          },
          error: function (sigErr) {
            console.error('Generate SDK signature error', JSON.stringify(sigErr, null, 2));
          },
        });
      };

      startMeeting();
    }, [payload]);

    return <Fragment>{/* Zoom SDK and meeting elements here */}</Fragment>;
  };

  export default Meeting;