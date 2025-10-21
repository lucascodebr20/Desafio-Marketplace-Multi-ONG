
import React from 'react';


const GitHubIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="currentColor" 
  >
    <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.25 6.5 1.75 1.75 0 0 1 6.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.8 0-1.32.53-1.54.92-.08.14-.1.34-.1.54V19h-3s.03-8.16 0-9h3v1.36a2.4 2.4 0 0 1 2.16-1.18c1.57 0 2.74 1.04 2.74 3.24z"></path>
  </svg>
);


const Footer = () => {

  const githubRepoUrl = 'https://github.com/lucascodebr20/Desafio-Marketplace-Multi-ONG'; 
  const linkedinUrl = 'https://www.linkedin.com/in/lucascamposcardosodemoraes/'; 

  return (
    <footer className="bg-black text-white shadow-inner">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Desafio técnico desenvolvido por Lucas Campos
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          <a 
            href={githubRepoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-gray-400 hover:text-white transition-colors duration-300"
            aria-label="Ver o código-fonte no GitHub"
          >
            <GitHubIcon />
            <span className="ml-2 text-sm font-medium"></span>
          </a>

          <a 
            href={linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-gray-400 hover:text-white transition-colors duration-300"
            aria-label="Ver meu perfil no LinkedIn"
          >
            <LinkedInIcon />
            <span className="ml-2 text-sm font-medium"></span>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;