import {useEffect, useState} from 'react';
function DownloadedImage({url}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchImage = async () => {
      try {
        const response = await fetch(url, {
          mode: 'cors',
        });

        if (!response.ok) {
          setError('Failed to download the image');
          console.error(
            'Error downloading the image: ',
            response.status,
            response.statusText
          );
          return;
        }

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl);
      } catch (error) {
        setError('Error downloading the image');
        console.error('Error downloading the image:', error);
      }
    };

    fetchImage();
  }, [url]);

  if (error) {
    return <div>{error}</div>;
  }

  return imageUrl ? (
    <img className="card-img-top" width={1} src={imageUrl} alt="Downloaded" />
  ) : (
    <div>Loading image...</div>
  );
}

export default DownloadedImage;
