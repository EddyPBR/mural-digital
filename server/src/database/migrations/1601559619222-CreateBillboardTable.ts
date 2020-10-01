import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBillboardTable1601559619222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "billboard",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "title_extended",
            type: "varchar",
          },
          {
            name: "text",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "datetime",
          },
          {
            name: "edited_at",
            type: "datetime",
          }
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("billboard");
  }
}
