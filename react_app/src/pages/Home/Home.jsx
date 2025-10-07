import bankTreeImage from '../../assets/bank-tree.webp';
import './Home.css';
import Chat from '../../assets/icon-chat.webp';
import Money from '../../assets/icon-money.webp';
import Security from '../../assets/icon-security.webp';




export default function Home() {
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
      <div className='feature-item'>
        <img className='feature-icon'src={Chat} alt='Icon chat'/>
        <h3 className="feature-item-title">Vous êtes notre priorité</h3>
        <p>Besoin de parler à un représentant ? Contactez-nous via notre chat disponible 24h/24 et 7j/7 ou par téléphone en moins de 5 minutes.</p>
      </div>
      <div className='feature-item'>
        <img className='feature-icon'src={Money} alt='Icon money'/>
         <h3 className="feature-item-title">Plus d'économies signifie des taux plus élevés</h3>
          <p>Plus vous économisez avec nous, plus votre taux d’intérêt sera élevé !</p>
      </div>
      <div className='feature-item'>
        <img className='feature-icon'src={Security} alt='Icon security'/>
         <h3 className="feature-item-title">Une sécurité à laquelle vous pouvez faire confiance</h3>
         <p>Nous utilisons un cryptage haut de gamme pour garantir que vos données et votre argent sont toujours en sécurité.</p>
      </div>
     </section>

    </main>
  );
}