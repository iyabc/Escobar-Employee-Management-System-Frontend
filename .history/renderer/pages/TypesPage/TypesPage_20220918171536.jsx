import React from 'react';
import styles from './PositionsPage.module.scss';
import TypesContent from '../../components/Types/TypesContent/TypesContent';
import SideMenu from '../../components/Shared/SideMenu/SideMenu';

export default function TypesPage() {
  return (
    <div className={styles.section}>
      <SideMenu homeState="" viewattendanceState="" viewemployeeState="" viewpositionsState="" viewtypesState="active" />
      <div className={styles.content}>
        <TypesContent />
      </div>
    </div>
  )
}
