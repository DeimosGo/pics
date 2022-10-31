import { MigrationInterface, QueryRunner } from "typeorm";

export class init1667169634107 implements MigrationInterface {
    name = 'init1667169634107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "name" character varying(190) NOT NULL, "last_name" character varying(190) NOT NULL, "birth_date" date NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "photographer_id" integer, CONSTRAINT "REL_3dbc90b3dfaa70ad00680a4bed" UNIQUE ("photographer_id"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "photographers" ("photographer_id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_eb11643ce7440cd7b40efa11b86" UNIQUE ("email"), CONSTRAINT "PK_4455509ed06203c373bdc471554" PRIMARY KEY ("photographer_id"))`);
        await queryRunner.query(`CREATE TABLE "pictures" ("picture_id" SERIAL NOT NULL, "url" character varying(255) NOT NULL, "description" text NOT NULL, "width" double precision NOT NULL, "height" double precision NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "photographerPhotographerId" integer, CONSTRAINT "PK_001c3bf0ae58aa225ee2cfc0f60" PRIMARY KEY ("picture_id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("category_id" SERIAL NOT NULL, "name" character varying(180) NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`CREATE TABLE "picture_categories" ("picture_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_3d1c2b04912ea530bbedb276b9a" PRIMARY KEY ("picture_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0f3c4b8cd01470aabfe210c1ba" ON "picture_categories" ("picture_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b7a18f4c2f9f6b399d64eca772" ON "picture_categories" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3dbc90b3dfaa70ad00680a4bedb" FOREIGN KEY ("photographer_id") REFERENCES "photographers"("photographer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pictures" ADD CONSTRAINT "FK_c829f7b91cc3a11bec29a6b6cf2" FOREIGN KEY ("photographerPhotographerId") REFERENCES "photographers"("photographer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "picture_categories" ADD CONSTRAINT "FK_0f3c4b8cd01470aabfe210c1ba6" FOREIGN KEY ("picture_id") REFERENCES "pictures"("picture_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "picture_categories" ADD CONSTRAINT "FK_b7a18f4c2f9f6b399d64eca772d" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "picture_categories" DROP CONSTRAINT "FK_b7a18f4c2f9f6b399d64eca772d"`);
        await queryRunner.query(`ALTER TABLE "picture_categories" DROP CONSTRAINT "FK_0f3c4b8cd01470aabfe210c1ba6"`);
        await queryRunner.query(`ALTER TABLE "pictures" DROP CONSTRAINT "FK_c829f7b91cc3a11bec29a6b6cf2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3dbc90b3dfaa70ad00680a4bedb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7a18f4c2f9f6b399d64eca772"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f3c4b8cd01470aabfe210c1ba"`);
        await queryRunner.query(`DROP TABLE "picture_categories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "pictures"`);
        await queryRunner.query(`DROP TABLE "photographers"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
