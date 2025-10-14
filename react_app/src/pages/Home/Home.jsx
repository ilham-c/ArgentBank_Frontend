import bankTreeImage from '../../assets/bank-tree.webp';
import './Home.css';
import Chat from '../../assets/icon-chat.webp';
import Money from '../../assets/icon-money.webp';
import Security from '../../assets/icon-security.webp';
import Feature from '../../components/Feature/Feature';

export default function Home() {
  const features = [
    {
      icon: Chat,
      alt: 'Icon chat',
      title: 'Vous êtes notre priorité',
      text: 'Besoin de parler à un représentant ? Contactez-nous via notre chat disponible 24h/24 et 7j/7 ou par téléphone en moins de 5 minutes.',
    },
    {
      icon: Money,
      alt: 'Icon money',
      title: 'Plus d\'économies signifie des taux plus élevés',
      text: 'Plus vous économisez avec nous, plus votre taux d’intérêt sera élevé !',
    },
    {
      icon: Security,
      alt: 'Icon security',
      title: 'Une sécurité à laquelle vous pouvez faire confiance',
      text: 'Nous utilisons un cryptage haut de gamme pour garantir que vos données et votre argent sont toujours en sécurité.',
    },
  ];

  return (
    <main>
      <div className='hero' style={{ backgroundImage: `url(${bankTreeImage})` }}>
        <section className="hero-content">
          <h2 className='sr-only'>Promoted Content</h2>
          <p className='subtitle'>No fees.</p>
          <p className='subtitle'>No minimum deposit.</p>
          <p className='subtitle'>High interest rates.</p>
          <p className='text'>Open a savings account with Argent Bank today!</p>
        </section>
      </div>

      <section className='features'>
        {features.map((feature, index) => (
          <Feature
            key={index}
            icon={feature.icon}
            alt={feature.alt}
            title={feature.title}
            text={feature.text}
          />
        ))}
      </section>
    </main>
  );
}
