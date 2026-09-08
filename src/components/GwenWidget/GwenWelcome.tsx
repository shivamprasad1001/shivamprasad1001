import React from 'react';
import gwenAvatar from '../../assets/gwen-avatar.svg';
const starters = ['Who is Shivam?', 'Explore the research', 'Show me projects', 'What is TriviLabs?', 'Ask about AI goals'];
export default function GwenWelcome({ onChipClick }: { onChipClick: (text: string) => void }) { return <div className="gwen-welcome"><img src={gwenAvatar} alt="Gwen" /><p className="gwen-welcome-kicker">Portfolio guide</p><h3>Hello, I’m Gwen.</h3><p>I can help you find Shivam’s projects, research interests, and the story behind the work.</p><div>{starters.map(text => <button key={text} onClick={() => onChipClick(text)}>{text}<span>›</span></button>)}</div></div>; }
