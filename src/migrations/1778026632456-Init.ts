import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778026632456 implements MigrationInterface {
    name = 'Init1778026632456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_rol_enum" AS ENUM('ADMIN', 'OPERADOR')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "rol" "user_rol_enum" NOT NULL DEFAULT 'OPERADOR', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "encomienda_tracking_estado_enum" AS ENUM('CREADA', 'EN_TRANSITO', 'ENTREGADA', 'CANCELADA')`);
        await queryRunner.query(`CREATE TABLE "encomienda_tracking" ("id" SERIAL NOT NULL, "estado" "encomienda_tracking_estado_enum" NOT NULL, "descripcion" character varying, "fecha" TIMESTAMP NOT NULL DEFAULT now(), "encomiendaId" integer, CONSTRAINT "PK_909bcef708c8c2628285e4fe9a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "encomienda_estado_enum" AS ENUM('CREADA', 'EN_TRANSITO', 'ENTREGADA', 'CANCELADA')`);
        await queryRunner.query(`CREATE TABLE "encomienda" ("id" SERIAL NOT NULL, "codigoSeguimiento" character varying NOT NULL, "nombreRemitente" character varying NOT NULL, "telefonoRemitente" character varying NOT NULL, "nombreDestinatario" character varying NOT NULL, "telefonoDestinatario" character varying NOT NULL, "origen" character varying NOT NULL, "destino" character varying NOT NULL, "peso" numeric(10,2) NOT NULL, "descripcion" character varying, "estado" "encomienda_estado_enum" NOT NULL DEFAULT 'CREADA', "creadoEn" TIMESTAMP NOT NULL DEFAULT now(), "actualizadoEn" TIMESTAMP NOT NULL DEFAULT now(), "eliminadoEn" TIMESTAMP, CONSTRAINT "UQ_9768f8bc4fc01050840335767d2" UNIQUE ("codigoSeguimiento"), CONSTRAINT "PK_22f50fa81423bf092cc275aed45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "encomienda_tracking" ADD CONSTRAINT "FK_54fca15ce6488484688a7456726" FOREIGN KEY ("encomiendaId") REFERENCES "encomienda"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "encomienda_tracking" DROP CONSTRAINT "FK_54fca15ce6488484688a7456726"`);
        await queryRunner.query(`DROP TABLE "encomienda"`);
        await queryRunner.query(`DROP TYPE "encomienda_estado_enum"`);
        await queryRunner.query(`DROP TABLE "encomienda_tracking"`);
        await queryRunner.query(`DROP TYPE "encomienda_tracking_estado_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_rol_enum"`);
    }

}
