import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Volume2, Podcast, Play, Pause, Square } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useRef, useEffect } from "react";
import buildTrustImage from "figma:asset/3baafe0f21583a9b7da98594fbc51e47eb668b81.png";

export function BuildTrust() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get audio duration when metadata is loaded
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Format duration in minutes and seconds
  const formatDuration = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Calculate time remaining
  const timeRemaining = duration - currentTime;

  // Handle seeking in the progress bar
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const raciData = [
    {
      letter: "R",
      role: "Responsible",
      meaning: "The person who does the work to complete the task."
    },
    {
      letter: "A",
      role: "Accountable",
      meaning: "The person who owns the task and makes final decisions. Only one per task."
    },
    {
      letter: "C",
      role: "Consulted",
      meaning: "People who provide input, expertise, or feedback."
    },
    {
      letter: "I",
      role: "Informed",
      meaning: "People who must be kept updated on progress."
    }
  ];

  const mvgSteps = [
    { number: 1, title: "Communicate Clearly & Often" },
    { number: 2, title: "Leverage Frameworks & Guardrails" },
    { number: 3, title: "Document KPIs & Transparency" },
    { number: 4, title: "Engage AI-Enabled Leadership" }
  ];

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  const aiTopics = [
    "Applied AI for Transformation",
    "Training",
    "KPI & ROI",
    "USMC Knowledge Management",
    "Human Health & Fitness",
    "Frameworks for Innovation",
    "AI Blind Spots & Pitfalls",
    "Governance & Workforce Readiness",
    "Next Live Q & A"
  ];

  return (
    <>
      <Card className="relative">
        <button 
          className="absolute top-4 right-4 text-primary hover:text-primary/80 transition-colors z-10"
          aria-label="Listen to this content"
        >
          <Volume2 className="size-5" />
        </button>
        <CardHeader>
          <CardTitle className="font-semibold text-lg pr-8">Build Trust</CardTitle>
          <h2 className="text-xl font-semibold mt-2">Digital Transformation is Measurable</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Introduction */}
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">
              AI governance is the leadership engine of digital transformation. A RACI matrix can be used to define roles and responsibility. The RACI matrix defines roles as Responsible, Accountable, Consulted, and Informed.
            </p>
            <p className="text-sm leading-relaxed">
              A RACI Matrix (also called a Responsibility Assignment Matrix) is a project-management tool used to define who does what for every task or deliverable in a project. It assigns one of four roles to each stakeholder:
            </p>
          </div>

          {/* RACI Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-accent/20 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-accent/40">
                  <th className="text-left p-3 font-semibold text-sm border-b border-border">Letter</th>
                  <th className="text-left p-3 font-semibold text-sm border-b border-border">Role</th>
                  <th className="text-left p-3 font-semibold text-sm border-b border-border">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {raciData.map((item, index) => (
                  <tr key={item.letter} className={index !== raciData.length - 1 ? "border-b border-border" : ""}>
                    <td className="p-3 font-semibold text-sm">{item.letter}</td>
                    <td className="p-3 font-semibold text-sm">{item.role}</td>
                    <td className="p-3 text-sm text-muted-foreground">{item.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MVG Content */}
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              If you want to move fast, you need Minimum Viable Governance — just enough structure to stay safe without slowing innovation. MVG works because AI evolves faster than any policy manual ever will. Build guardrails, not roadblocks — and make sure your AI Governance Key Performance Indicators are transparent, explicit, and measurable.
            </p>
          </div>

          {/* MVG Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {mvgSteps.map((step) => (
              <div key={step.number} className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-accent/40 flex items-center justify-center mx-auto font-semibold">
                  {step.number}
                </div>
                <p className="text-xs text-muted-foreground leading-tight">
                  {step.title}
                </p>
              </div>
            ))}
          </div>

          {/* Podcast Card */}
          <Card className="border border-border shadow-sm bg-purple-50/50">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Podcast className="size-5 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">Podcast - The Great Debate: AI Leadership Challenges</CardTitle>
                  <p className="text-sm text-muted-foreground">Listen to this discussion on the critical challenges facing AI leaders today</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <p className="text-sm text-muted-foreground">
                Duration: {formatDuration(duration)}
              </p>
              
              <audio ref={audioRef} src="https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/Agility_MVG_AI_Governance.m4a" preload="metadata" />
              
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={togglePlayPause}
                  size="lg"
                  className="flex-1 sm:flex-initial bg-green-600 hover:bg-green-700 text-white"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="size-5 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="size-5 mr-2" />
                      Play Podcast
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleStop}
                  size="lg"
                  variant="outline"
                  className="flex-1 sm:flex-initial bg-black hover:bg-gray-800 text-white border-black"
                  disabled={!isPlaying}
                >
                  <Square className="size-5 mr-2" />
                  Stop
                </Button>
              </div>

              {/* Progress Bar */}
              {isPlaying && (
                <div className="space-y-2 pt-1">
                  {/* Time Display */}
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatDuration(currentTime)}</span>
                    <span>-{formatDuration(timeRemaining)}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div 
                    className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer hover:h-3 transition-all"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-green-600 rounded-full transition-all"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Governance KPIs Card */}
          <div className="bg-accent/20 rounded-lg p-6 space-y-4 border border-border">
            <h3 className="font-semibold text-lg">AI Governance KPIs</h3>
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-muted-foreground italic">
                Transparency in government operations is a priority. - Attorney General's FOIA Guidelines (March 2022)
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Open government is built on transparency, participation, and collaboration, as described in the <a href="https://www.whitehouse.gov/wp-content/uploads/legacy_drupal_files/omb/memoranda/2010/m10-06.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline">Open Government Directive</a> issued by the Office of Management and Budget in 2009 (M-10-06). Through implementation of M-10-06, the <a href="https://www.justice.gov/oip/freedom-information-act-5-usc-552" target="_blank" rel="noopener noreferrer" className="text-primary underline">Freedom of Information Act</a>, the <a href="https://www.congress.gov/bill/115th-congress/house-bill/4174" target="_blank" rel="noopener noreferrer" className="text-primary underline">Foundations for Evidence-Based Policymaking Act of 2018</a>, and other laws and policies governing how information is made available to the public, the Department works to create an effective government through public awareness and participation.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Transparency and collaboration are consistent with the Open Government Act and the <a href="https://www.justice.gov/oip/freedom-information-act-5-usc-552" target="_blank" rel="noopener noreferrer" className="text-primary underline">Freedom of Information Act</a>, both of which promote public access to information and accountable decision‑making. It's not just an AI checkmark — it's financial stewardship and responsible citizenship.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground pt-2">
                The Clinger‑Cohen Act was enacted in 1996.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Under the Clinger‑Cohen Act, AI spending must be justified, measurable, mission‑aligned, and managed as a strategic IT investment—not a tech experiment. This ensures responsible stewardship of resources and maximizes return on investment.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The Information Technology Management Reform Act and the Federal Acquisition Reform Act were signed into law in 1996 and together became known as the <a href="https://www.dau.edu/acquipedia-article/clinger-cohen-act-cca" target="_blank" rel="noopener noreferrer" className="text-primary underline">Clinger‑Cohen Act</a>.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground pt-3">
                Download this <a href="https://www.smartsheet.com/content/raci-templates-excel" target="_blank" rel="noopener noreferrer" className="text-primary underline">RACI Matrix Template</a> to apply governance frameworks, with roles and responsibilities to your organization.
              </p>
              <h4 className="font-semibold pt-3">Governance Transparency & Accessibility Score (TAS)</h4>
              <p className="text-sm leading-relaxed">
                Measures how clearly AI governance policies, roles, and KPIs are communicated and how easily employees can access them.
              </p>
              <div className="space-y-2 pt-2">
                <p className="text-sm font-semibold">KPI Definition:</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Tracks the percentage of AI governance materials (policies, standards, KPIs, decision logs, model cards, risk assessments) that are published, up‑to‑date, and accessible through a centralized, easy‑to‑find location.
                </p>
              </div>
              <div className="bg-background rounded-lg p-4 space-y-2 border-2 border-primary/30">
                <p className="text-sm font-semibold">Example Target:</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Achieve 95% publication and accessibility of all AI governance documents in a single, searchable repository.
                </p>
              </div>
            </div>
          </div>

          {/* Reference Image (optional - for comparison) */}
          <div className="mt-6 hidden">
            <img 
              src={buildTrustImage} 
              alt="Build Trust reference" 
              className="w-full rounded-lg border border-border"
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}