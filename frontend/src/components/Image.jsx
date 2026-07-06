import { useState, useRef, useCallback, useEffect } from "react";

const API_BASE = "http://localhost:5000";

// Histogram bar chart component
function HistogramChart({ data, threshold }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const width = 512;
  const height = 100;
  const barW = width / 256;

  return (
    <div className="mt-4">
      <p className="text-xs font-mono text-slate-400 mb-1 tracking-widest uppercase">
        Grayscale Histogram
      </p>
      <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          {data.map((val, i) => {
            const barH = max > 0 ? (val / max) * height : 0;
            const isThreshold = i === Math.round(threshold);
            return (
              <rect
                key={i}
                x={i * barW}
                y={height - barH}
                width={barW}
                height={barH}
                fill={isThreshold ? "#f97316" : i < threshold ? "#334155" : "#64748b"}
                opacity={isThreshold ? 1 : 0.85}
              />
            );
          })}
          {/* Threshold line */}
          <line
            x1={threshold * barW}
            y1={0}
            x2={threshold * barW}
            y2={height}
            stroke="#f97316"
            strokeWidth="2"
            strokeDasharray="4,2"
          />
        </svg>
        <div
          className="absolute top-1 text-orange-400 text-[10px] font-mono pointer-events-none"
          style={{ left: Math.min(threshold * (100 / 256), 85) + "%" }}
        >
          T={threshold}
        </div>
      </div>
    </div>
  );
}

// Drag-and-drop upload zone
function UploadZone({ onFile, isDragging, setIsDragging }) {
  const inputRef = useRef();

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) onFile(file);
    },
    [onFile, setIsDragging]
  );

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      className={`
        relative flex flex-col items-center justify-center gap-3 cursor-pointer
        border-2 border-dashed rounded-2xl p-10 transition-all duration-300 select-none
        ${isDragging
          ? "border-orange-400 bg-orange-500/10 scale-[1.02]"
          : "border-slate-600 hover:border-slate-400 bg-slate-900/60 hover:bg-slate-800/60"}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
      />
      <div className={`text-5xl transition-transform duration-300 ${isDragging ? "scale-110" : ""}`}>
        {isDragging ? "📂" : "🖼️"}
      </div>
      <div className="text-center">
        <p className="text-slate-200 font-semibold text-lg tracking-tight">
          Drop your image here
        </p>
        <p className="text-slate-500 text-sm mt-1">
          or <span className="text-orange-400 underline underline-offset-2">click to browse</span>
          {" "}— PNG, JPG, BMP, WebP
        </p>
      </div>
    </div>
  );
}

// Image comparison viewer
function CompareViewer({ original, result }) {
  const [sliderX, setSliderX] = useState(50);
  const containerRef = useRef();
  const dragging = useRef(false);

  const onMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderX(pct);
  };

  return (
    <div className="mt-6">
      <p className="text-xs font-mono text-slate-400 mb-2 tracking-widest uppercase">
        Drag to Compare
      </p>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl border border-slate-700 select-none"
        style={{ cursor: "col-resize", aspectRatio: "16/9", background: "repeating-conic-gradient(#1e293b 0% 25%, #0f172a 0% 50%) 0 0/16px 16px" }}
        onMouseDown={() => (dragging.current = true)}
        onMouseMove={(e) => dragging.current && onMove(e.clientX)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
      >
        {/* Result image (full width, left clip) */}
        <img
          src={result}
          alt="Result"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
          draggable={false}
        />
        {/* Original image (right side) */}
        <img
          src={original}
          alt="Original"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ clipPath: `inset(0 0 0 ${sliderX}%)` }}
          draggable={false}
        />
        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-orange-400 z-10"
          style={{ left: `${sliderX}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center shadow-lg shadow-orange-400/40">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 8H11M5 8L3 6M5 8L3 10M11 8L13 6M11 8L13 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {/* Labels */}
        <span className="absolute top-2 left-3 text-[10px] font-mono bg-black/60 text-orange-300 px-2 py-0.5 rounded uppercase tracking-widest">Removed</span>
        <span className="absolute top-2 right-3 text-[10px] font-mono bg-black/60 text-slate-300 px-2 py-0.5 rounded uppercase tracking-widest">Original</span>
      </div>
    </div>
  );
}

export default function Image() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [histogram, setHistogram] = useState(null);
  const [threshold, setThreshold] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [stage, setStage] = useState("idle"); // idle | loaded | done

  const handleFile = useCallback((f) => {
    setFile(f);
    setResult(null);
    setHistogram(null);
    setThreshold(null);
    setError(null);
    setStage("loaded");
    const url = URL.createObjectURL(f);
    setPreview(url);
  }, []);

  const handleProcess = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_BASE}/remove-background`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Server error");
      }

      setResult(data.result_image);
      setHistogram(data.histogram);
      setThreshold(data.otsu_threshold);
      setStage("done");
    } catch (err) {
      setError(err.message || "Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setHistogram(null);
    setThreshold(null);
    setError(null);
    setStage("idle");
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = "bg_removed.png";
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-['IBM_Plex_Mono',monospace]">
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');`}</style>

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-slate-700/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-xs text-orange-400 tracking-[0.3em] uppercase">OpenCV · Flask · React</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-['Syne',sans-serif] font-800 leading-tight text-white">
            Otsu Background<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
              Separator
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-3 max-w-lg leading-relaxed">
            Removes image backgrounds using <strong className="text-slate-200">Otsu's thresholding</strong> —
            an unsupervised algorithm that finds the optimal grayscale separation point automatically.
          </p>
        </div>

        {/* Main card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-sm p-6 shadow-2xl shadow-black/40">

          {/* Upload zone */}
          {stage === "idle" && (
            <UploadZone onFile={handleFile} isDragging={isDragging} setIsDragging={setIsDragging} />
          )}

          {/* Preview + actions */}
          {(stage === "loaded" || stage === "done") && (
            <div>
              {stage === "loaded" && (
                <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950" style={{ background: "repeating-conic-gradient(#1e293b 0% 25%, #0f172a 0% 50%) 0 0/16px 16px" }}>
                  <img src={preview} alt="Preview" className="w-full max-h-80 object-contain mx-auto" />
                </div>
              )}

              {/* Compare view when done */}
              {stage === "done" && preview && result && (
                <CompareViewer original={preview} result={result} />
              )}

              {/* Histogram */}
              {stage === "done" && histogram && threshold !== null && (
                <HistogramChart data={histogram} threshold={threshold} />
              )}

              {/* Threshold info */}
              {stage === "done" && threshold !== null && (
                <div className="mt-4 flex items-center gap-3 bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-700">
                  <div className="w-3 h-3 rounded-full bg-orange-400" />
                  <span className="text-slate-300 text-sm">
                    Otsu threshold: <strong className="text-orange-300 text-base">{threshold}</strong>
                    <span className="text-slate-500 ml-2">/ 255</span>
                  </span>
                  <span className="ml-auto text-xs text-slate-500">pixels below = background</span>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-4 rounded-xl bg-red-900/30 border border-red-700 px-4 py-3 text-red-300 text-sm">
                  ⚠ {error}
                </div>
              )}

              {/* Action buttons */}
              <div className="mt-5 flex flex-wrap gap-3">
                {stage === "loaded" && (
                  <button
                    onClick={handleProcess}
                    disabled={loading}
                    className="flex-1 py-3 px-6 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="50" strokeLinecap="round" />
                        </svg>
                        Processing…
                      </span>
                    ) : (
                      "✦ Remove Background"
                    )}
                  </button>
                )}

                {stage === "done" && (
                  <button
                    onClick={handleDownload}
                    className="flex-1 py-3 px-6 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm tracking-wide transition-all duration-200"
                  >
                    ↓ Download PNG
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="py-3 px-5 rounded-xl border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white text-sm font-medium transition-all duration-200"
                >
                  {stage === "done" ? "New Image" : "Cancel"}
                </button>
              </div>

              {/* Re-upload different image when loaded */}
              {stage === "loaded" && !loading && (
                <p className="text-center text-slate-600 text-xs mt-4">
                  Wrong image?{" "}
                  <button onClick={handleReset} className="text-slate-400 hover:text-white underline underline-offset-2 transition-colors">
                    Upload another
                  </button>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Algorithm explainer */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-sm font-['Syne'] font-bold tracking-widest uppercase text-slate-300 mb-4">
            How Otsu's Algorithm Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                title: "Grayscale + Blur",
                desc: "Converts the image to grayscale and applies a Gaussian blur to suppress high-frequency noise."
              },
              {
                step: "02",
                title: "Optimal Threshold",
                desc: "Searches all 256 pixel values and picks the one that minimizes intra-class variance between foreground and background."
              },
              {
                step: "03",
                title: "Binary Mask → Alpha",
                desc: "Creates a binary mask at the threshold, refines it with morphological ops, then applies it as the PNG alpha channel."
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <span className="text-orange-500 font-['Syne'] font-bold text-2xl leading-none mt-0.5 shrink-0">{item.step}</span>
                <div>
                  <p className="text-slate-200 text-sm font-semibold mb-1">{item.title}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-700 text-xs mt-8">
          Flask + OpenCV backend · React + Tailwind frontend · Otsu's Method (1979)
        </p>
      </div>
    </div>
  );
}