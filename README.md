# YouTube Video Downloader

This is a Node.js application that allows users to download YouTube videos by providing the video URL. 

It uses the [ytdl-core](https://github.com/distubejs/ytdl-core/tree/master) library to handle YouTube video downloading.

## Features
- Download YouTube videos in MP4 format.
- Simple CLI interface.
- Progress bar for download status.

## Requirements
- Node.js (v12 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dylanchiang301/YoutubeDownload.git
   ```
2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

To download a video, run the following command:
* YouTube URL accept video page/ youtuber's video list/ playlist
    ```bash
    node index <YouTube URL>
    ```

## Example

    node index.js https://www.youtube.com/watch?v=XXXExample

    node index.js https://www.youtube.com/@XXXExample/videos

    node index.js https://www.youtube.com/playlist?list=XXXExample

## License
This project is licensed under the MIT License.