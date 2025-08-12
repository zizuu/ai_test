namespace CloudPrintApp.Services
{
    public class ImageProcessingService
    {
        public string ImageDataUrl { get; set; }
        public string SelectedFrameId { get; set; }

        // Event to notify components when data changes (optional, but good for reactivity)
        public event Action OnChange;

        public void SetImageDataUrl(string dataUrl)
        {
            ImageDataUrl = dataUrl;
            NotifyStateChanged();
        }

        public void SetSelectedFrameId(string frameId)
        {
            SelectedFrameId = frameId;
            NotifyStateChanged();
        }

        private void NotifyStateChanged() => OnChange?.Invoke();
    }
}