import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Preview,
} from '@react-email/components';

export default function welcometemplate({ name }: { name: string }) {
  return (
    <Html>
      <Head>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </Head>
      <Preview>Welcome to the app, {name}!</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={{ ...heading, animation: 'fadeIn 0.5s ease-out' }}>
            Welcome to the app, {name}!
          </Text>
          <Text
            style={{ ...paragraph, animation: 'fadeIn 0.5s ease-out 0.2s' }}
          >
            We're excited to have you on board. Get started by exploring our
            features!
          </Text>
          <Link
            href='https://www.google.com'
            style={{ ...link, animation: 'fadeIn 0.5s ease-out 0.4s' }}
          >
            Explore Now
          </Link>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: '60px 0',
};

const container = {
  background: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  margin: '0 auto',
  maxWidth: '550px',
  padding: '50px 30px',
};

const heading = {
  color: '#1a202c',
  fontSize: '32px',
  fontWeight: '800',
  letterSpacing: '-0.5px',
  lineHeight: '1.2',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const paragraph = {
  color: '#4a5568',
  fontSize: '18px',
  lineHeight: '1.6',
  margin: '0 0 28px',
  textAlign: 'center' as const,
};

const link = {
  backgroundColor: '#5a67d8',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '14px 28px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: '#4c51bf',
    transform: 'translateY(-2px)',
  },
};
