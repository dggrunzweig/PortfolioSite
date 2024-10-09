export function db2mag(db_value: number): number {
  return Math.pow(10, db_value / 20);
}

export function createBiquadFilter(
    ctx: AudioContext, type: BiquadFilterType, frequency: number, Q: number,
    gain_dB: number): BiquadFilterNode {
  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = frequency;
  filter.Q.value = Q;
  if (type === 'lowshelf' || type === 'highshelf') filter.gain.value = gain_dB;
  return filter;
}

export function createGain(ctx: AudioContext, initial_gain = 1.0): GainNode {
  const gain = ctx.createGain();
  gain.gain.value = initial_gain;
  return gain;
}

export function createBufferSource(
    ctx: AudioContext, buffer: AudioBuffer, playback_rate: number,
    loop: boolean): AudioBufferSourceNode {
  const bs = ctx.createBufferSource();
  bs.buffer = buffer;
  bs.playbackRate.value = playback_rate;
  bs.loop = loop;
  return bs;
}

export function createAudioContext(): AudioContext {
  // initialize audio
  const audio_ctx = new window.AudioContext();
  // immediately suspend
  audio_ctx.suspend();
  return audio_ctx;
}

export function CreateBufferFromFile(
    context: AudioContext, url: string): Promise<AudioBuffer|undefined> {
  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      if (request.response == null) reject(null);
      let undecodedAudio = request.response;
      context.decodeAudioData(undecodedAudio, (data) => {
        resolve(data);
      });
    };
    request.send();
  })
}

export function createAudioBuffer(
    n_channels: number, n_frames: number, sample_rate: number): AudioBuffer {
  // create a buffer
  return new AudioBuffer({
    numberOfChannels: n_channels,
    length: n_frames,
    sampleRate: sample_rate,
  });
}

export function ReverseAudioBuffer(buffer: AudioBuffer): AudioBuffer {
  const n_channels = buffer.numberOfChannels;
  const n_frames = buffer.length;
  const fs = buffer.sampleRate;
  const rev_buffer = createAudioBuffer(n_channels, n_frames, fs)
  for (let c = 0; c < n_channels; ++c) {
    const ch_r = rev_buffer.getChannelData(c);
    const ch_f = buffer.getChannelData(c);
    for (let i = 0; i < n_frames / 2; ++i) {
      ch_r[i] = ch_f[n_frames - 1 - i];
      ch_r[n_frames - 1 - i] = ch_f[i];
    }
  }
  return rev_buffer;
}
