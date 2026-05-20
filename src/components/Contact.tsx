import { FormEvent, useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Linkedin, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Contact() {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      organisation: String(data.get('organisation') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    };
    if (!payload.name || !payload.email || !payload.message) {
      setError('Please fill in name, email, and a short message.');
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(payload.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSending(true);
    setError(null);
    const { error } = await supabase.from('contact_submissions').insert(payload);
    setSending(false);
    if (error) {
      setError('Something went wrong. Please email ethan@sensusinvista.ltd directly.');
      return;
    }
    setDone(true);
    form.reset();
  };

  return (
    <section id="contact" className="relative section-pad border-t border-white/5 overflow-hidden pb-32 md:pb-40">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(50% 50% at 80% 20%, rgba(43,42,99,0.35) 0%, transparent 60%), radial-gradient(40% 40% at 10% 90%, rgba(217,122,74,0.18) 0%, transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-14">
          <span className="h-px w-10 bg-bone/30" />
          <span className="eyebrow">Let's talk</span>
        </div>

        <div className="relative rounded-[28px] border border-white/10 bg-ink/80 backdrop-blur-sm p-8 md:p-14 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-6">
            <h2 className="font-serif italic font-light text-[44px] md:text-[72px] leading-[1] text-bone">
              A stress-free<br />discovery call.
            </h2>
            <p className="mt-10 max-w-[52ch] text-[17px] leading-[1.65] text-bone/70">
              Tell me what you're trying to change, and what success would look like for the people
              it will touch. You'll hear back personally within two business days.
            </p>

            <div className="mt-14 space-y-4 text-[14.5px] text-bone/75">
              <a href="mailto:ethan@sensusinvista.ltd" className="flex items-center gap-3 link-underline">
                <Mail size={15} />
                ethan@sensusinvista.ltd
              </a>
              <div className="flex items-center gap-3 text-bone/60">
                <MapPin size={15} />
                Southport, United Kingdom
              </div>
              <a
                href="https://linkedin.com/in/ethanjamesfarrell"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 link-underline"
              >
                <Linkedin size={15} />
                linkedin.com/in/ethanjamesfarrell
              </a>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="canvas-card p-6 md:p-10">
              {done ? (
                <div className="flex flex-col items-start gap-5 py-10">
                  <CheckCircle2 size={28} className="text-prism" />
                  <h3 className="font-display font-semibold text-[28px] text-bone tracking-tightest">
                    Thank you. It's landed.
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-bone/70 max-w-[44ch]">
                    I'll reply personally within two business days. If anything is time-sensitive,
                    you can also email me directly at ethan@sensusinvista.ltd.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <Field name="name" label="Your name" required />
                  <Field name="email" label="Email" type="email" required />
                  <Field name="organisation" label="Organisation (optional)" />
                  <Field name="message" label="About the opportunity" textarea required />

                  {error && (
                    <p id="contact-error" role="alert" className="text-[13px] text-ember">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    aria-busy={sending}
                    className="inline-flex items-center justify-between gap-4 bg-bone text-obsidian rounded-full px-6 py-3.5 text-[14px] font-medium hover:bg-ember transition-colors disabled:opacity-60 min-h-[44px]"
                  >
                    <span className="inline-flex items-center gap-2">
                      {sending && (
                        <span aria-hidden className="inline-flex h-2 w-2 rounded-full bg-obsidian animate-pulse" />
                      )}
                      {sending ? 'Sending…' : 'Send inquiry'}
                    </span>
                    <ArrowUpRight size={16} />
                  </button>

                  <p className="text-[12px] text-bone/55 leading-[1.5]">
                    Typical reply within two business days. A discovery call covers fit, scope and a
                    realistic timeline. Engagements start from focused 2-week sprints.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = 'text',
  textarea,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const base =
    'w-full bg-transparent border-b border-white/15 focus:border-ember/80 outline-none py-3 text-[15px] text-bone placeholder-bone/55 transition-colors';
  const fieldId = `field-${name}`;
  return (
    <div className="block">
      <label htmlFor={fieldId} className="block text-[11px] tracking-[0.2em] uppercase text-bone/65 mb-2">
        {label}
        {required && <span className="ml-1 text-ember/90" aria-hidden> *</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {textarea ? (
        <textarea
          id={fieldId}
          name={name}
          rows={4}
          required={required}
          maxLength={2000}
          className={base}
          placeholder="A few sentences is plenty."
        />
      ) : (
        <input id={fieldId} name={name} type={type} required={required} className={base} />
      )}
    </div>
  );
}
