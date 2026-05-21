import { useEffect, useRef, useCallback } from 'react'

const SMOOTHING = 0.25

export default function usePoseDetection({ videoRef, onPoseDetected, enabled }) {
  const poseRef      = useRef(null)
  const smoothedRef  = useRef({})
  const animFrameRef = useRef(null)

  const smoothLandmarks = useCallback((landmarks) => {
    if (!landmarks) return landmarks
    const prev = smoothedRef.current

    const smoothed = landmarks.map((lm, i) => {
      const p = prev[i]
      if (!p) return lm
      return {
        x:          p.x + SMOOTHING * (lm.x - p.x),
        y:          p.y + SMOOTHING * (lm.y - p.y),
        z:          p.z + SMOOTHING * (lm.z - p.z),
        visibility: lm.visibility,
      }
    })

    smoothedRef.current = smoothed
    return smoothed
  }, [])

  useEffect(() => {
    if (!enabled) return

    let pose = null

    const initPose = async () => {
      try {
        const { Pose } = await import('@mediapipe/pose')

        pose = new Pose({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1635989137/${file}`,
        })

        pose.setOptions({
          modelComplexity:        1,
          smoothLandmarks:        true,
          enableSegmentation:     false,
          smoothSegmentation:     false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence:  0.5,
        })

        pose.onResults((results) => {
          if (results.poseLandmarks && results.poseLandmarks.length > 0) {
            const smoothed = smoothLandmarks(results.poseLandmarks)
            onPoseDetected(smoothed)
          }
        })

        poseRef.current = pose
        console.log('[usePoseDetection] Pose detection initialized')
      } catch (err) {
        console.error('[usePoseDetection] Failed to init MediaPipe:', err)
      }
    }

    initPose()

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (pose) {
        try {
          pose.close?.()
        } catch (e) {
          console.warn('Error closing pose:', e)
        }
      }
    }
  }, [enabled, onPoseDetected, smoothLandmarks])

  const sendFrame = useCallback(async () => {
    if (
      poseRef.current &&
      videoRef.current &&
      videoRef.current.readyState >= 2
    ) {
      try {
        await poseRef.current.send({ image: videoRef.current })
      } catch (err) {
        // frame dropped — safe to ignore
      }
    }
    animFrameRef.current = requestAnimationFrame(sendFrame)
  }, [videoRef])

  useEffect(() => {
    if (!enabled) return

    const timer = setTimeout(() => {
      animFrameRef.current = requestAnimationFrame(sendFrame)
    }, 1500)

    return () => {
      clearTimeout(timer)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [enabled, sendFrame])
}