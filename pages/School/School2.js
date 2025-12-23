import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function School2() {
  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          <Text style={styles.hello}>Hello ! </Text>
          <Text style={styles.name}>Mabisha</Text>
        </Text>

        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/school.png')}
            style={styles.schoolImage}
          />
        </View>

        <Text style={styles.schoolName}>
          Josephs Matric HR Sec School Sasthankari
        </Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.description}>
         The school has Private building. It has got 24 classrooms for
          instructional purposes. All the classrooms are in good condition. It
          has 2 other rooms for non-teaching activities. The school has a
          separate room for Head master/Teacher. The school has Pucca boundary
          wall. The school has electric connection. The source of Drinking Water
          in the school is Tap Water and it is functional. The school has 10 boys
          toilet and it is functional. The school has a playground. The school
          has a library and has 2500 books in its library. The school does not
          need ramp for disabled children to access classrooms. The school has 5
          computers for teaching and learning purposes and all are functional.
          The school is not having a computer aided learning lab.
        </Text>

        {/* Photos Row */}
        <Text style={styles.sectionTitle}>Photos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
          <Image source={require('../../assets/school1.png')} style={styles.photo} />
          <Image source={require('../../assets/school2.png')} style={styles.photo} />
          <Image source={require('../../assets/school3.png')} style={styles.photo} />
          <Image source={require('../../assets/school3.png')} style={styles.photo} />
        </ScrollView>

        {/* Vision */}
        <Text style={styles.sectionTitle}>Our Vision</Text>
        <Text style={styles.visionText}>
          To empower students to become confident, responsible, compassionate
          individuals who are prepared to face the future with knowledge,
          character, and a lifelong passion for learning.
        </Text>

        {/* Mission */}
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.description}>
         The New School prepares students to understand, contribute to, and succeed in a rapidly changing world, 
         making it better and more just. Through education grounded in intellectual freedom and academic excellence,
         we will ensure that our students develop the competencies and creativity essential for success, collaboration,
         and leadership in the fields that will shape the future. We will also lead in generating practical and theoretical 
         knowledge that enables people to understand our world and improve life locally and globally.
        </Text>

        {/* Academic Excellence */}
        <Text style={styles.sectionTitle}>Academic Excellence</Text>
        <Text style={styles.description}>
          We are a university where design, social research, and the arts drive approaches to addressing issues of our time, such as 
         climate change, democracy, urbanization, technological change, economic empowerment, migration, and globalization.  
         We will be the preeminent intellectual and creative center for passionate and compassionate engagement in a world that 
         increasingly calls for better-designed objects, communication, systems, and organizations to create a just and resilient future for all.
        </Text>
        {/* Why Choose Us */}
        <Text style={styles.sectionTitle}>Why Choose Us?</Text>
        <Text style={styles.description}>
            Emphasis on moral values, discipline. Individual attention and mentorship.
          Strong parent-teacher collaboration. Affordable, quality education.
          Consistently high academic results in board examinations.
        </Text>

        {/* Image Gallery */}
        <Text style={styles.sectionTitle}>Image Gallery</Text>
        <View style={styles.galleryContainer}>
          {/* First Row - 3 images */}
          <View style={styles.galleryRow}>
            <Image source={require('../../assets/school1.png')} style={styles.galleryImage} />
            <Image source={require('../../assets/school2.png')} style={styles.galleryImage} />
            <Image source={require('../../assets/school3.png')} style={styles.galleryImage} />
          </View>

          {/* Second Row - 2 centered images */}
          <View style={[styles.galleryRow, styles.secondRow]}>
            <Image source={require('../../assets/school2.png')} style={styles.galleryImage} />
            <Image source={require('../../assets/school3.png')} style={styles.galleryImage} />
          </View>
        </View>

        {/* About Text */}
       <Text style={styles.sectionTitle}>ABOUT</Text>
<View style={styles.aboutContainer}>
  <Image
    source={require('../../assets/school1.png')}
    style={styles.aboutImage}
  />
  <Text style={styles.aboutText}>
    Over 15 Years in Engineering Arunachala College of Engineering for Women, Kanyakumari,
    stands as the No.1 Women’s Engineering College in Tamil Nadu, India, recognized for its
    outstanding placements and top rankings. It has also been honored as the Best Women’s
    Engineering College in India by ISTE, New Delhi, making it a Top College for girls in India.
  </Text>
</View>

        {/* Contact Section */}
        <Text style={styles.sectionTitle}>Contact</Text>
        <View style={styles.contactRow}>
          <Image
            source={require('../../assets/map.png')}
            style={styles.mapImage}
          />
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactText}>
              Colachel, Kurunthancode{"\n"}
              Kanyakumari, Tamil Nadu{"\n"}
              PIN Code: 629251 (INDIA){"\n"}
              Mobile: +91 XXXXX-XXXXX{"\n"}
              Email: xxx@xxxxxx
            </Text>

            {/* Social Media Icons */}
            <View style={styles.socialIconsRow}>
              <Image source={require('../../assets/yt.png')} style={styles.icon} />
              <Image source={require('../../assets/insta.png')} style={styles.icon} />
              <Image source={require('../../assets/fb.png')} style={styles.icon} />
              <Image source={require('../../assets/msg.png')} style={styles.icon} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  greeting: 
  { fontSize: 18, 
    marginBottom: 10 
},
  hello:
   { color: '#0070C0',
     fontWeight: '600' 
    },
  name:
   { color: '#003366', 
    fontWeight: 'bold'
 },
  imageContainer:
   { alignItems: 'center',
     marginBottom: 8 
    },
  schoolImage:
   { width: 100, 
    height: 100, 
    resizeMode: 'contain' 
},
  schoolName: 
  { fontSize: 16, 
    fontWeight: 'bold', 
    color: '#003366', 
    textAlign: 'center' 
},
  scrollContent: 
  { paddingHorizontal: 16,
     paddingTop: 10, 
     paddingBottom: 20 
    },
  sectionTitle:
   { fontSize: 15,
     fontWeight: 'bold', 
     color: '#003366', 
     marginTop: 10, 
     marginBottom: 8 
    },
  photoScroll:
   { marginBottom: 16 
   },
  photo:
   { width: 80,
     height: 80,
      resizeMode: 'cover',
       borderRadius: 6, 
       marginRight: 8 
    },
  visionText:
   { fontSize: 14, 
    color: '#333', 
    lineHeight: 20, 
    marginBottom: 16,
     textAlign: 'justify' 
    },
  description:
   { fontSize: 14,
     color: '#333', 
     lineHeight: 20, 
     textAlign: 'justify',
      marginBottom: 20 
    },
  galleryContainer: 
  { marginBottom: 16, 
    alignItems: 'center'
 },
  galleryRow:
   { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 8 
},
  secondRow: {
     justifyContent: 'space-evenly', 
     width: '66%'
     },
  galleryImage: { 
    width: 100,
     height: 100,
      borderRadius: 6,
       marginHorizontal: 5,
        resizeMode: 'cover' 
    },
  aboutText:
   {  flex: 1,
    fontSize: 14, color: '#333',
     lineHeight: 20, marginBottom: 16, 
     textAlign: 'justify' },
  contactRow: { flexDirection: 'row', marginBottom: 16 },
  mapImage: { width: 100, height: 100, marginRight: 10 },
  contactTextContainer: { flex: 1 },
  contactText: { fontSize: 14, color: '#333', lineHeight: 20 },
  socialIconsRow: { flexDirection: 'row', marginTop: 8 },
  icon: { 
    width: 30,
     height: 30, 
     marginRight: 8
     },
  aboutContainer: {
  flexDirection: 'row', // Image left, text right
  alignItems: 'flex-start',
  marginBottom: 16,
},
aboutImage: {
  width: 120,
  height: 120,
  borderRadius: 6,
  marginRight: 10,
  resizeMode: 'cover',
},
});
