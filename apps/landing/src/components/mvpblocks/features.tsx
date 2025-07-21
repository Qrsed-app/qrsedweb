import {
  Package,
  StickyNote,
  Book,
  Users,
  Shield,
  FileText,
} from 'lucide-react';
import { Particles } from '../ui/particles';

const features = [
  {
    icon: <Package className="h-6 w-6" />,
    title: 'Player Equipment',
    desc: 'Give your players a clean interface to manage their equipment and inventory while you focus on storytelling.',
  },
  {
    icon: <StickyNote className="h-6 w-6" />,
    title: 'Private Player Notes',
    desc: 'Let your players keep their character notes organized and private while you maintain campaign oversight.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Party Management',
    desc: 'Organize your players, manage character information, and coordinate your entire campaign in one place.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Campaign Privacy',
    desc: 'Maintain complete control over what information is shared, keeping plot twists and secrets secure.',
  },
  {
    icon: <Book className="h-6 w-6" />,
    title: 'Obsidian Integration',
    desc: 'Connect with your Obsidian vault to share selected GM notes with players while keeping secrets safe.',
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Character Sheets',
    desc: 'Digital character sheets that players can update in real-time, keeping all character information organized.',
  },
];
export default function Features() {
  return (
    <section className="relative py-14 bg-background">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        refresh
        color='#8b5cf6'
      />

      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="relative mx-auto max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h3 className="font-geist mt-4 text-3xl font-normal tracking-tighter sm:text-4xl md:text-5xl">
              Everything you need for epic campaigns
            </h3>
            <p className="font-geist text-muted-foreground mt-3">
              Give your players the tools they need while maintaining complete control
              over your campaign narrative and information sharing.
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                'linear-gradient(152.92deg, rgba(151, 90, 239, 0.2) 4.54%, rgba(151, 90, 239, 0.26) 34.2%, rgba(151, 90, 239, 0.1) 77.55%)',
            }}
          ></div>
        </div>
        <hr className="bg-foreground/30 mx-auto mt-5 h-px w-1/2" />
        <div className="relative mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <li
                key={idx}
                className="transform-gpu space-y-3 rounded-xl border border-primary/20 bg-white/5 p-4 backdrop-blur-md [box-shadow:0_-20px_80px_-20px_rgba(151,90,239,0.15)_inset]"
              >
                <div className="text-primary w-fit transform-gpu rounded-full border border-primary/20 p-4 [box-shadow:0_-20px_80px_-20px_rgba(151,90,239,0.25)_inset]">
                  {item.icon}
                </div>
                <h4 className="font-geist text-lg font-bold tracking-tighter">
                  {item.title}
                </h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
