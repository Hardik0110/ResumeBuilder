import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },
  section: { marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 10 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subheader: { fontSize: 14, color: '#1e3a8a', marginTop: 10 },
  text: { marginBottom: 5, lineHeight: 1.5 },
  listItem: { marginLeft: 10, marginBottom: 5 },
});

const ResumePDF = ({ resumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>{resumeData.header.name || 'Your Name'}</Text>
      <Text style={styles.text}>
        {resumeData.header.email || 'email@example.com'} | {resumeData.header.phone || '(123) 456-7890'}
      </Text>

      {resumeData.summary && (
        <View style={styles.section}>
          <Text style={styles.subheader}>Summary</Text>
          <Text style={styles.text}>{resumeData.summary}</Text>
        </View>
      )}

      {resumeData.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subheader}>Experience</Text>
          {resumeData.experience.map((exp, index) => (
            <View key={index}>
              <Text style={styles.text}>
                {exp.title || 'Job Title'} - {exp.company || 'Company'}
              </Text>
              <Text style={styles.text}>
                {(exp.startDate && exp.endDate) ? `${exp.startDate} - ${exp.endDate}` : 'Start Date - End Date'}
              </Text>
              <Text style={styles.text}>{exp.description || 'Description'}</Text>
            </View>
          ))}
        </View>
      )}

      {resumeData.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subheader}>Education</Text>
          {resumeData.education.map((edu, index) => (
            <View key={index}>
              <Text style={styles.text}>
                {edu.degree || 'Degree'} - {edu.institution || 'Institution'}
              </Text>
              <Text style={styles.text}>{edu.year || 'Year'}</Text>
            </View>
          ))}
        </View>
      )}

      {resumeData.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subheader}>Skills</Text>
          {resumeData.skills.map((skill, index) => (
            <Text key={index} style={styles.listItem}>
              • {skill || 'Skill'}
            </Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default ResumePDF;