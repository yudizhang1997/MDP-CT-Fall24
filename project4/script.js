// 生成诗歌的函数
const generatePoem = async () => {
    const keyword = document.getElementById('keyword').value.trim();
    const baseUrl = 'https://poetrydb.org';

    let apiUrl;
    if (keyword) {
        apiUrl = `${baseUrl}/lines/${keyword}`;
    } else {
        apiUrl = `${baseUrl}/random`;
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch poems from API.');
        }
        const poems = await response.json();

        // 如果提供了关键词，则过滤结果
        const filteredPoems = poems.filter(poem =>
            poem.lines.some(line => line.toLowerCase().includes(keyword.toLowerCase()))
        );

        if (filteredPoems.length === 0) {
            throw new Error('No poems found matching the keyword.');
        }

        const poem = filteredPoems[0];

        // 限制显示的诗歌行数，最多显示前5行
        const maxLines = 5;  // 限制为5行
        const poemText = `${poem.title}\n\n${poem.lines.slice(0, maxLines).join('\n')}`;

        // 显示生成的诗歌
        document.getElementById('poem-text').textContent = poemText;

    } catch (error) {
        document.getElementById('poem-text').textContent = `Error: ${error.message}`;
        console.error(error);
    }
};

// 朗读诗歌的函数
const readPoem = async () => {
    const poemText = document.getElementById('poem-text').textContent;

    // 使用 Google Cloud Text-to-Speech API 朗读诗歌
    const apiKey = 'AIzaSyBpAWvpwlgN25hH1E4QUjvaqhzpr4pKbCY';  // 在这里替换为你的 Google Cloud API 密钥
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

    const requestPayload = {
        input: { text: poemText },
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' }
    };

    try {
        const audioResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestPayload),
        });

        if (!audioResponse.ok) {
            throw new Error('Failed to fetch speech synthesis audio.');
        }

        const audioData = await audioResponse.json();
        const audioContent = audioData.audioContent;
        const audioBlob = new Blob([new Uint8Array(atob(audioContent).split("").map(c => c.charCodeAt(0)))], { type: 'audio/mp3' });

        const audioURL = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioURL);
        audio.play();  // 播放朗读的诗歌

    } catch (error) {
        console.error('Error with text-to-speech API:', error);
    }
};

// 绑定按钮点击事件
document.getElementById('generate-poem').addEventListener('click', generatePoem);

// 绑定朗读按钮点击事件
document.getElementById('read-poem').addEventListener('click', readPoem);

// 下载诗歌到本地的函数
document.getElementById('save-poem').addEventListener('click', () => {
    const poemText = document.getElementById('poem-text').textContent;
    const blob = new Blob([poemText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'generated-poem.txt';
    link.click();
});