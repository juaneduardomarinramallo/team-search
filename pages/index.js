import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'

import Team from '../src/components/team'
import PageHeader from '../src/components/pageHeader'
import PageFooter from '../src/components/pageFooter'

export default function Home() {
  
  const [teams, setTeams] = useState([]);
  const readTeams = () => {
    console.debug('Descargando equipos');
    
    axios.get("https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=English%20Premier%20League#")
    .then(response => {
        //console.debug(response);
        if(response.status === 200){
          // Para devolver el arreglo transformado
          // const equipos = response.data.teams.map(team => team.strTeam)
          // console.debug(equipos);
          const equipos = response.data.teams.map(team => {
            return {
              id: team.idTeam,
              name: team.strTeam,
              logo: team.strTeamBadge,
              stadium: team.strStadium
            }
          });
          // console.debug(equipos);
          setTeams(equipos);
        }
      }
    )
    .catch(error => {}
    )
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <PageHeader title={'New Search'}/>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            Here goes my app.
            <button className="button is-primary" onClick={readTeams}>
              La Liga
            </button>
            <button className="button is-large is-danger is-rounded">
              Mi boton
            </button>
          </div>
        </div>
      </main>

     <div className="container">
      <h2>Teams: </h2>
      <div className="columns is-multiline">
        {
          //Forma simple
          //teams.map((team,index) => <Team team={team} key={'team-${index}'}/>)
          teams.map((team,index) => {
            return  <Team team={team} key={'team-${index}'}/>;
          })
          
        }
      </div>
     </div>

      <footer className={styles.footer}>
        <PageFooter />
      </footer>
    </div>
  )
}
